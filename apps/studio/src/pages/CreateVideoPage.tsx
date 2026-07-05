import { FileAudio, FileText, MonitorPlay, Settings2 } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { getReadyAssetsByKind, type StudioAsset } from "../entities/asset";
import type { StudioAspectRatio, VideoWorkflowConfiguration } from "../entities/workflow";
import { AssetPicker } from "../features/workflows/AssetPicker";
import { VideoPreviewPanel } from "../features/workflows/VideoPreviewPanel";
import { getDefaultVideoConfiguration, listAssets } from "../shared/api/studioApiClient";
import { Badge } from "../shared/ui/Badge";
import { Card, CardHeader, CardTitle } from "../shared/ui/Card";

const aspectRatioOptions: StudioAspectRatio[] = ["9:16", "16:9", "1:1"];

export function CreateVideoPage() {
  const [configuration, setConfiguration] = useState<VideoWorkflowConfiguration | null>(null);
  const [avatarAssets, setAvatarAssets] = useState<StudioAsset[]>(() => getReadyAssetsByKind("avatar"));
  const [voiceAssets, setVoiceAssets] = useState<StudioAsset[]>(() => getReadyAssetsByKind("voice"));
  const [backgroundAssets, setBackgroundAssets] = useState<StudioAsset[]>(() => getReadyAssetsByKind("background"));
  const [sceneAssets, setSceneAssets] = useState<StudioAsset[]>(() => getReadyAssetsByKind("scene"));
  const [scriptAssets, setScriptAssets] = useState<StudioAsset[]>(() => getReadyAssetsByKind("script_template"));
  const kitId = new URLSearchParams(window.location.search).get("kit") ?? undefined;

  useEffect(() => {
    void getDefaultVideoConfiguration({ kitId }).then(setConfiguration);
  }, [kitId]);

  useEffect(() => {
    let cancelled = false;
    void Promise.all([
      listAssets({ kind: "avatar", status: "ready" }),
      listAssets({ kind: "voice", status: "ready" }),
      listAssets({ kind: "background", status: "ready" }),
      listAssets({ kind: "scene", status: "ready" }),
      listAssets({ kind: "script_template", status: "ready" }),
    ]).then(([avatars, voices, backgrounds, scenes, scripts]) => {
      if (cancelled) return;
      setAvatarAssets(avatars);
      setVoiceAssets(voices);
      setBackgroundAssets(backgrounds);
      setSceneAssets(scenes);
      setScriptAssets(scripts);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!configuration) {
    return <div className="rounded-xl border border-studio-border bg-white/90 p-6 text-sm font-bold text-studio-muted">正在载入视频创作配置...</div>;
  }

  return (
    <div className="grid gap-5">
      <section className="rounded-xl border border-studio-border bg-gradient-to-br from-white via-studio-primarySoft/70 to-studio-actionSoft p-6 shadow-sm">
        <Badge tone="primary">{kitId ? `Create Video · ${kitId}` : "Create Video"}</Badge>
        <h1 className="mt-4 text-2xl font-bold text-studio-text">创建数字人视频</h1>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-studio-muted">
          选择形象、音色、背景/场景和脚本模板，先在本地 mock 环境完成组合预览，后续渲染任务可直接替换为云端队列。
        </p>
      </section>

      <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)_380px]">
        <div className="grid content-start gap-4">
          <Card>
            <CardHeader>
              <CardTitle subtitle="这些设置会随项目一起提交给后端渲染任务。">输出设置</CardTitle>
            </CardHeader>
            <div className="grid gap-4 p-5">
              <SettingRow icon={<MonitorPlay className="h-4 w-4" />} label="画幅">
                <div className="grid grid-cols-3 gap-2">
                  {aspectRatioOptions.map((ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() =>
                        setConfiguration({
                          ...configuration,
                          output: { ...configuration.output, aspectRatio: ratio },
                        })
                      }
                      className={`rounded-lg border px-2 py-2 text-xs font-bold transition-colors ${
                        configuration.output.aspectRatio === ratio
                          ? "border-studio-primary bg-studio-primarySoft text-studio-primaryStrong"
                          : "border-studio-border bg-white text-studio-muted hover:border-studio-primary/40"
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </SettingRow>

              <SettingRow icon={<Settings2 className="h-4 w-4" />} label="分辨率">
                <select
                  value={configuration.output.resolution}
                  onChange={(event) =>
                    setConfiguration({
                      ...configuration,
                      output: { ...configuration.output, resolution: event.target.value as VideoWorkflowConfiguration["output"]["resolution"] },
                    })
                  }
                  className="w-full rounded-lg border border-studio-border bg-white px-3 py-2 text-sm font-bold text-studio-text outline-none focus:border-studio-primary"
                >
                  <option value="720p">720p</option>
                  <option value="1080p">1080p</option>
                  <option value="2k">2k</option>
                </select>
              </SettingRow>

              <SettingRow icon={<FileText className="h-4 w-4" />} label="字幕">
                <label className="flex items-center justify-between rounded-lg border border-studio-border bg-white px-3 py-2 text-sm font-bold text-studio-text">
                  自动字幕
                  <input
                    type="checkbox"
                    checked={configuration.output.subtitleEnabled}
                    onChange={(event) =>
                      setConfiguration({
                        ...configuration,
                        output: { ...configuration.output, subtitleEnabled: event.target.checked },
                      })
                    }
                    className="h-4 w-4 accent-studio-primary"
                  />
                </label>
              </SettingRow>

              <SettingRow icon={<FileAudio className="h-4 w-4" />} label="时长">
                <input
                  type="number"
                  min={15}
                  max={300}
                  value={configuration.output.durationSec}
                  onChange={(event) =>
                    setConfiguration({
                      ...configuration,
                      output: { ...configuration.output, durationSec: Number(event.target.value) },
                    })
                  }
                  className="w-full rounded-lg border border-studio-border bg-white px-3 py-2 text-sm font-bold text-studio-text outline-none focus:border-studio-primary"
                />
              </SettingRow>
            </div>
          </Card>
        </div>

        <div className="grid content-start gap-4">
          <div className="grid gap-4 2xl:grid-cols-2">
            <AssetPicker
              title="选择数字形象"
              description="优先选择已就绪形象，可在资产中心上传新形象。"
              assets={avatarAssets}
              selectedAssetId={configuration.avatar.id}
              onSelect={(avatar) => setConfiguration({ ...configuration, avatar })}
            />
            <AssetPicker
              title="选择音色"
              description="音频样本可直接试听，后续会接入音色克隆。"
              assets={voiceAssets}
              selectedAssetId={configuration.voice.id}
              onSelect={(voice) => setConfiguration({ ...configuration, voice })}
            />
            <AssetPicker
              title="选择背景"
              description="背景用于横屏/通用画面，场景用于案例化组合。"
              assets={[...backgroundAssets, ...sceneAssets]}
              selectedAssetId={configuration.scene.id}
              onSelect={(asset) =>
                asset.kind === "background"
                  ? setConfiguration({ ...configuration, background: asset })
                  : setConfiguration({ ...configuration, scene: asset })
              }
            />
            <AssetPicker
              title="选择脚本"
              description="脚本模板会进入编辑器，可替换为用户输入。"
              assets={scriptAssets}
              selectedAssetId={configuration.script.id}
              onSelect={(script) => setConfiguration({ ...configuration, script })}
            />
          </div>
        </div>

        <VideoPreviewPanel configuration={configuration} />
      </div>
    </div>
  );
}

function SettingRow({ children, icon, label }: { children: ReactNode; icon: ReactNode; label: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-bold text-studio-muted">
        <span className="text-studio-primary">{icon}</span>
        {label}
      </div>
      {children}
    </div>
  );
}
