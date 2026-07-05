import { CheckCircle2, Cloud, Database, FileAudio, Image as ImageIcon, Layers3 } from "lucide-react";
import type { ReactNode } from "react";
import type { StudioAsset } from "../../entities/asset";
import { Badge } from "../../shared/ui/Badge";

type AssetDetailPanelProps = {
  asset: StudioAsset;
};

const kindLabel: Record<StudioAsset["kind"], string> = {
  avatar: "数字形象",
  voice: "声音资产",
  background: "背景资产",
  scene: "场景资产",
  knowledge: "知识库",
  persona: "人设",
  script_template: "脚本模板",
  runtime_preset: "运行预设",
  export_video: "导出视频",
};

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function AssetDetailPanel({ asset }: AssetDetailPanelProps) {
  const previewKind = asset.preview.audioUrl ? "audio" : asset.preview.imageUrl ? "image" : "config";

  return (
    <aside className="rounded-xl border border-studio-border bg-white/90 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Badge tone={asset.status === "ready" ? "success" : "warm"}>{asset.status === "ready" ? "已就绪" : "处理中"}</Badge>
          <h2 className="mt-3 text-lg font-bold text-studio-text">{asset.name}</h2>
          <p className="mt-1 text-sm font-semibold text-studio-muted">{kindLabel[asset.kind]}</p>
        </div>
        <span className="rounded-lg border border-studio-primarySoft bg-studio-primarySoft/70 px-2.5 py-1 text-xs font-bold text-studio-primaryStrong">
          {asset.storage.provider}
        </span>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-studio-borderSoft bg-studio-primarySoft/35">
        {previewKind === "image" ? (
          <img src={asset.preview.imageUrl} alt={`${asset.name}预览`} className="h-56 w-full object-cover" />
        ) : previewKind === "audio" ? (
          <div className="grid min-h-44 place-items-center p-5">
            <FileAudio className="h-10 w-10 text-studio-primary" aria-hidden />
            <audio className="mt-4 w-full" controls src={asset.preview.audioUrl}>
              <track kind="captions" />
            </audio>
          </div>
        ) : (
          <div className="grid min-h-44 place-items-center p-5 text-center">
            <Layers3 className="h-10 w-10 text-studio-primary" aria-hidden />
            <p className="mt-3 text-sm font-bold text-studio-muted">配置型资产</p>
          </div>
        )}
      </div>

      {asset.preview.textExcerpt ? <p className="mt-4 rounded-lg bg-studio-mint p-3 text-sm leading-6 text-studio-muted">{asset.preview.textExcerpt}</p> : null}

      <div className="mt-5 grid gap-3 text-sm">
        <InfoRow icon={<Database className="h-4 w-4" />} label="对象 Key" value={asset.storage.key} />
        <InfoRow icon={<Cloud className="h-4 w-4" />} label="存储桶" value={`${asset.storage.bucket} / ${asset.storage.region}`} />
        <InfoRow icon={<ImageIcon className="h-4 w-4" />} label="文件类型" value={`${asset.storage.contentType} · ${formatBytes(asset.storage.sizeBytes)}`} />
        <InfoRow icon={<CheckCircle2 className="h-4 w-4" />} label="上传状态" value={`${asset.upload.status} · ${asset.upload.progress}%`} />
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {asset.workflows.map((workflow) => (
          <span key={workflow} className="rounded-full bg-studio-primarySoft px-2.5 py-1 text-xs font-bold text-studio-primaryStrong">
            {workflow}
          </span>
        ))}
      </div>
    </aside>
  );
}

function InfoRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3 rounded-lg border border-studio-borderSoft bg-white/80 p-3">
      <span className="mt-0.5 text-studio-primary">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-bold text-studio-muted">{label}</p>
        <p className="mt-1 break-all text-sm font-semibold text-studio-text">{value}</p>
      </div>
    </div>
  );
}
