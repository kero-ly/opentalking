import { Loader2, Play, Subtitles } from "lucide-react";
import { useState } from "react";
import type { StudioTask } from "../../entities/asset";
import type { VideoWorkflowConfiguration } from "../../entities/workflow";
import { createProject, createTask } from "../../shared/api/studioApiClient";
import { Badge } from "../../shared/ui/Badge";
import { Button } from "../../shared/ui/Button";

type VideoPreviewPanelProps = {
  configuration: VideoWorkflowConfiguration;
};

export function VideoPreviewPanel({ configuration }: VideoPreviewPanelProps) {
  const [task, setTask] = useState<StudioTask | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRender() {
    setIsSubmitting(true);
    const linkedAssetIds = [
      configuration.avatar.id,
      configuration.voice.id,
      configuration.background.id,
      configuration.scene.id,
      configuration.script.id,
    ];
    await createProject({
      name: "本地资产视频草稿",
      type: "video",
      linkedAssetIds,
    });
    const nextTask = await createTask({
      type: "video_render",
      assetIds: linkedAssetIds,
      message: "视频渲染任务已进入本地 mock 队列。",
    });
    setTask(nextTask);
    setIsSubmitting(false);
  }

  return (
    <aside className="rounded-xl border border-studio-border bg-white/90 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-studio-text">视频预览</h2>
          <p className="mt-1 text-sm leading-6 text-studio-muted">当前组合会生成 {configuration.output.aspectRatio} 口播视频。</p>
        </div>
        <Badge tone="blue">{configuration.output.resolution}</Badge>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-studio-border bg-studio-primarySoft/40">
        <div className="relative aspect-[9/16] max-h-[560px] bg-studio-text">
          <img src={configuration.scene.preview.imageUrl ?? configuration.background.preview.imageUrl} alt={configuration.scene.name} className="h-full w-full object-cover opacity-95" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-studio-text/70 to-transparent" />
          <img
            src={configuration.avatar.preview.imageUrl}
            alt={configuration.avatar.name}
            className="absolute bottom-0 left-1/2 h-[78%] -translate-x-1/2 object-contain drop-shadow-[0_22px_36px_rgba(32,24,79,0.34)]"
          />
          <div className="absolute left-3 right-3 top-3 flex items-center justify-between gap-2">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-studio-primaryStrong">OpenTalking Studio</span>
            <span className="rounded-full bg-studio-action px-3 py-1 text-xs font-bold text-white">REC</span>
          </div>
          <p className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/90 p-3 text-sm font-bold leading-6 text-studio-text">
            {configuration.script.preview.textExcerpt}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <PreviewRow label="数字形象" value={configuration.avatar.name} />
        <PreviewRow label="音色" value={configuration.voice.name} />
        <PreviewRow label="脚本" value={configuration.script.name} />
        <PreviewRow label="背景" value={configuration.scene.name} />
      </div>

      {configuration.voice.preview.audioUrl ? (
        <div className="mt-4 rounded-lg border border-studio-borderSoft bg-studio-mint p-3">
          <p className="mb-2 text-xs font-bold text-studio-muted">音色试听</p>
          <audio className="w-full" controls src={configuration.voice.preview.audioUrl}>
            <track kind="captions" />
          </audio>
        </div>
      ) : null}

      {task ? (
        <div className="mt-4 rounded-lg border border-studio-primarySoft bg-studio-primarySoft/60 p-3 text-sm">
          <p className="font-bold text-studio-text">{task.id}</p>
          <p className="mt-1 text-xs font-semibold text-studio-muted">{task.message}</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
            <div className="h-full rounded-full bg-gradient-to-r from-studio-primary to-studio-actionEnd" style={{ width: `${Math.max(task.progress, 8)}%` }} />
          </div>
        </div>
      ) : null}

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Button variant="primary" icon={isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />} onClick={handleRender}>
          创建任务
        </Button>
        <Button icon={<Subtitles className="h-4 w-4" />}>字幕设置</Button>
      </div>
    </aside>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-studio-borderSoft bg-white/80 px-3 py-2 text-sm">
      <span className="font-bold text-studio-muted">{label}</span>
      <span className="truncate font-bold text-studio-text">{value}</span>
    </div>
  );
}
