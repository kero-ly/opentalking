import { Brain, Gauge, Radio, SlidersHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { getReadyAssetsByKind, type StudioAsset } from "../entities/asset";
import type { RealtimeWorkflowConfiguration } from "../entities/workflow";
import { AssetPicker } from "../features/workflows/AssetPicker";
import { RealtimePreviewPanel } from "../features/workflows/RealtimePreviewPanel";
import { getDefaultRealtimeConfiguration, listAssets } from "../shared/api/studioApiClient";
import { Badge } from "../shared/ui/Badge";
import { Card, CardHeader, CardTitle } from "../shared/ui/Card";

export function CreateRealtimePage() {
  const [configuration, setConfiguration] = useState<RealtimeWorkflowConfiguration | null>(null);
  const [avatars, setAvatars] = useState<StudioAsset[]>(() => getReadyAssetsByKind("avatar"));
  const [voices, setVoices] = useState<StudioAsset[]>(() => getReadyAssetsByKind("voice"));
  const [backgrounds, setBackgrounds] = useState<StudioAsset[]>(() => getReadyAssetsByKind("background"));
  const [scenes, setScenes] = useState<StudioAsset[]>(() => getReadyAssetsByKind("scene"));
  const [knowledge, setKnowledge] = useState<StudioAsset[]>(() => getReadyAssetsByKind("knowledge"));
  const [personas, setPersonas] = useState<StudioAsset[]>(() => getReadyAssetsByKind("persona"));
  const [runtimes, setRuntimes] = useState<StudioAsset[]>(() => getReadyAssetsByKind("runtime_preset"));
  const kitId = new URLSearchParams(window.location.search).get("kit") ?? undefined;

  useEffect(() => {
    void getDefaultRealtimeConfiguration({ kitId }).then(setConfiguration);
  }, [kitId]);

  useEffect(() => {
    let cancelled = false;
    void Promise.all([
      listAssets({ kind: "avatar", status: "ready" }),
      listAssets({ kind: "voice", status: "ready" }),
      listAssets({ kind: "background", status: "ready" }),
      listAssets({ kind: "scene", status: "ready" }),
      listAssets({ kind: "knowledge", status: "ready" }),
      listAssets({ kind: "persona", status: "ready" }),
      listAssets({ kind: "runtime_preset", status: "ready" }),
    ]).then(([nextAvatars, nextVoices, nextBackgrounds, nextScenes, nextKnowledge, nextPersonas, nextRuntimes]) => {
      if (cancelled) return;
      setAvatars(nextAvatars);
      setVoices(nextVoices);
      setBackgrounds(nextBackgrounds);
      setScenes(nextScenes);
      setKnowledge(nextKnowledge);
      setPersonas(nextPersonas);
      setRuntimes(nextRuntimes);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!configuration) {
    return <div className="rounded-xl border border-studio-border bg-white/90 p-6 text-sm font-bold text-studio-muted">正在载入实时数字人配置...</div>;
  }

  return (
    <div className="grid gap-5">
      <section className="rounded-xl border border-studio-border bg-gradient-to-br from-white via-studio-primarySoft/70 to-studio-actionSoft p-6 shadow-sm">
        <Badge tone="primary">{kitId ? `Realtime Human · ${kitId}` : "Realtime Human"}</Badge>
        <h1 className="mt-4 text-2xl font-bold text-studio-text">创建实时对话数字人</h1>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-studio-muted">
          将形象、音色、人设、知识库和运行预设组合成可测试的实时会话，后续可以发布为分享链接、嵌入组件或 API。
        </p>
      </section>

      <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)_400px]">
        <div className="grid content-start gap-4">
          <Card>
            <CardHeader>
              <CardTitle subtitle="这些设置决定实时互动体验和后续云端会话参数。">会话设置</CardTitle>
            </CardHeader>
            <div className="grid gap-4 p-5">
              <SessionToggle
                icon={<Radio className="h-4 w-4" />}
                label="语音活动检测"
                checked={configuration.session.vadEnabled}
                onChange={(checked) => setConfiguration({ ...configuration, session: { ...configuration.session, vadEnabled: checked } })}
              />
              <SessionToggle
                icon={<Brain className="h-4 w-4" />}
                label="允许打断回答"
                checked={configuration.session.interruptible}
                onChange={(checked) => setConfiguration({ ...configuration, session: { ...configuration.session, interruptible: checked } })}
              />
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-studio-muted">
                  <Gauge className="h-4 w-4 text-studio-primary" aria-hidden />
                  延迟目标
                </div>
                <input
                  type="range"
                  min={400}
                  max={1600}
                  step={100}
                  value={configuration.session.latencyTargetMs}
                  onChange={(event) =>
                    setConfiguration({
                      ...configuration,
                      session: { ...configuration.session, latencyTargetMs: Number(event.target.value) },
                    })
                  }
                  className="w-full accent-studio-primary"
                />
                <p className="mt-1 text-xs font-bold text-studio-muted">{configuration.session.latencyTargetMs}ms</p>
              </div>
              <div className="rounded-lg border border-studio-border bg-white p-3">
                <p className="flex items-center gap-2 text-sm font-bold text-studio-text">
                  <SlidersHorizontal className="h-4 w-4 text-studio-primary" aria-hidden />
                  {configuration.runtime.name}
                </p>
                <p className="mt-2 text-xs font-semibold leading-5 text-studio-muted">{configuration.runtime.description}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid content-start gap-4">
          <div className="grid gap-4 2xl:grid-cols-2">
            <AssetPicker title="数字形象" description="选择会话窗口中的可交互形象。" assets={avatars} selectedAssetId={configuration.avatar.id} onSelect={(avatar) => setConfiguration({ ...configuration, avatar })} />
            <AssetPicker title="音色" description="选择实时回答使用的声音样本。" assets={voices} selectedAssetId={configuration.voice.id} onSelect={(voice) => setConfiguration({ ...configuration, voice })} />
            <AssetPicker
              title="人设"
              description="控制语气、边界和回复风格。"
              assets={personas}
              selectedAssetId={configuration.persona.id}
              onSelect={(persona) => setConfiguration({ ...configuration, persona })}
            />
            <AssetPicker
              title="知识库"
              description="绑定业务资料，让数字人回答真实问题。"
              assets={knowledge}
              selectedAssetId={configuration.knowledge.id}
              onSelect={(knowledgeAsset) => setConfiguration({ ...configuration, knowledge: knowledgeAsset })}
            />
            <AssetPicker
              title="背景"
              description="会话背景可来自普通背景或案例场景。"
              assets={[...backgrounds, ...scenes.filter((scene) => scene.workflows.includes("realtime"))]}
              selectedAssetId={configuration.background.id}
              onSelect={(background) => setConfiguration({ ...configuration, background })}
            />
            <AssetPicker title="运行预设" description="选择实时推理质量、延迟和资源策略。" assets={runtimes} selectedAssetId={configuration.runtime.id} onSelect={(runtime) => setConfiguration({ ...configuration, runtime })} />
          </div>
        </div>

        <RealtimePreviewPanel configuration={configuration} />
      </div>
    </div>
  );
}

function SessionToggle({
  checked,
  icon,
  label,
  onChange,
}: {
  checked: boolean;
  icon: ReactNode;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-lg border border-studio-border bg-white px-3 py-2 text-sm font-bold text-studio-text">
      <span className="flex items-center gap-2">
        <span className="text-studio-primary">{icon}</span>
        {label}
      </span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 accent-studio-primary" />
    </label>
  );
}
