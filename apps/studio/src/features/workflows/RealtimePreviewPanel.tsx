import { Activity, Loader2, MessageCircle, PhoneCall, Radio } from "lucide-react";
import { useState } from "react";
import type { StudioTask } from "../../entities/asset";
import type { RealtimeWorkflowConfiguration } from "../../entities/workflow";
import { createProject, createTask } from "../../shared/api/studioApiClient";
import { Badge } from "../../shared/ui/Badge";
import { Button } from "../../shared/ui/Button";

type RealtimePreviewPanelProps = {
  configuration: RealtimeWorkflowConfiguration;
};

const sessionLog = ["初始化 WebSocket 通道", "加载形象与音色样本", "绑定人设与知识库", "等待用户开始测试会话"];

export function RealtimePreviewPanel({ configuration }: RealtimePreviewPanelProps) {
  const [task, setTask] = useState<StudioTask | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleStartSession() {
    setIsSubmitting(true);
    const linkedAssetIds = [
      configuration.avatar.id,
      configuration.voice.id,
      configuration.background.id,
      configuration.knowledge.id,
      configuration.persona.id,
      configuration.runtime.id,
    ];
    await createProject({
      name: "实时数字人测试会话",
      type: "realtime",
      linkedAssetIds,
    });
    const nextTask = await createTask({
      type: "realtime_session",
      assetIds: linkedAssetIds,
      message: "实时会话 mock 已排队，等待连接测试。",
    });
    setTask(nextTask);
    setIsSubmitting(false);
  }

  return (
    <aside className="rounded-xl border border-studio-border bg-white/90 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-studio-text">实时预览</h2>
          <p className="mt-1 text-sm leading-6 text-studio-muted">用于验证形象、知识库和低延迟会话配置。</p>
        </div>
        <Badge tone="success">{configuration.session.transport}</Badge>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-studio-border bg-studio-primarySoft/40">
        <div className="relative aspect-[4/5] bg-studio-text">
          <img src={configuration.background.preview.imageUrl} alt={configuration.background.name} className="h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-studio-text/70 via-transparent to-white/10" />
          <img
            src={configuration.avatar.preview.imageUrl}
            alt={configuration.avatar.name}
            className="absolute bottom-0 left-1/2 h-[82%] -translate-x-1/2 object-contain drop-shadow-[0_24px_40px_rgba(32,24,79,0.36)]"
          />
          <div className="absolute left-3 right-3 top-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-studio-primaryStrong">
              <Radio className="h-3.5 w-3.5" aria-hidden />
              低延迟测试台
            </span>
            <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">READY</span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/92 p-3">
            <p className="text-sm font-bold text-studio-text">{configuration.persona.name}</p>
            <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-studio-muted">{configuration.persona.preview.textExcerpt}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <Metric label="延迟目标" value={`${configuration.session.latencyTargetMs}ms`} />
        <Metric label="可打断" value={configuration.session.interruptible ? "开启" : "关闭"} />
        <Metric label="VAD" value={configuration.session.vadEnabled ? "开启" : "关闭"} />
      </div>

      <div className="mt-4 rounded-lg border border-studio-borderSoft bg-studio-mint p-3">
        <p className="text-xs font-bold text-studio-muted">知识库摘要</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-studio-text">{configuration.knowledge.preview.textExcerpt}</p>
      </div>

      {configuration.voice.preview.audioUrl ? (
        <div className="mt-4 rounded-lg border border-studio-borderSoft bg-white p-3">
          <p className="mb-2 text-xs font-bold text-studio-muted">音色试听 · {configuration.voice.name}</p>
          <audio className="w-full" controls src={configuration.voice.preview.audioUrl}>
            <track kind="captions" />
          </audio>
        </div>
      ) : null}

      <div className="mt-4 rounded-lg border border-studio-borderSoft bg-white p-3">
        <p className="mb-2 flex items-center gap-2 text-xs font-bold text-studio-muted">
          <Activity className="h-3.5 w-3.5" aria-hidden />
          连接日志
        </p>
        <div className="grid gap-2">
          {sessionLog.map((item, index) => (
            <p key={item} className="text-xs font-semibold text-studio-muted">
              {String(index + 1).padStart(2, "0")} · {item}
            </p>
          ))}
          {task ? <p className="text-xs font-bold text-studio-primaryStrong">{task.id} · {task.message}</p> : null}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Button variant="primary" icon={isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <PhoneCall className="h-4 w-4" />} onClick={handleStartSession}>
          测试会话
        </Button>
        <Button icon={<MessageCircle className="h-4 w-4" />}>嵌入配置</Button>
      </div>
    </aside>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-studio-borderSoft bg-white/80 p-3 text-center">
      <p className="text-xs font-bold text-studio-muted">{label}</p>
      <p className="mt-1 text-sm font-bold text-studio-text">{value}</p>
    </div>
  );
}
