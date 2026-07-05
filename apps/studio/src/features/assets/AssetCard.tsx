import type { StudioAsset } from "../../entities/asset";
import { Badge } from "../../shared/ui/Badge";

type AssetCardProps = {
  asset: StudioAsset;
  isSelected?: boolean;
  onSelect?: (asset: StudioAsset) => void;
};

const toneClass: Record<StudioAsset["thumbnailTone"], string> = {
  mint: "from-studio-primarySoft to-white",
  blue: "from-indigo-100 to-violet-100",
  warm: "from-studio-actionSoft to-white",
  mixed: "from-studio-primarySoft via-white to-studio-actionSoft",
};

const kindLabel: Record<StudioAsset["kind"], string> = {
  avatar: "数字形象",
  voice: "声音",
  background: "背景",
  scene: "场景",
  knowledge: "知识库",
  persona: "人设",
  script_template: "脚本",
  runtime_preset: "运行预设",
  export_video: "导出视频",
};

export function AssetCard({ asset, isSelected = false, onSelect }: AssetCardProps) {
  const mediaLabel = asset.preview.audioUrl ? "音频样本" : asset.preview.imageUrl ? "图片预览" : "配置资产";

  return (
    <button
      type="button"
      onClick={() => onSelect?.(asset)}
      className={`overflow-hidden rounded-xl border bg-white/90 text-left shadow-sm transition-colors hover:border-studio-primary/50 ${
        isSelected ? "border-studio-primary ring-2 ring-studio-primarySoft" : "border-studio-border"
      }`}
    >
      <div className={`relative h-32 bg-gradient-to-br ${toneClass[asset.thumbnailTone]}`}>
        {asset.preview.imageUrl ? (
          <img src={asset.preview.imageUrl} alt={asset.name} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="absolute inset-4 rounded-xl border border-white/60 bg-white/45 backdrop-blur-sm" />
        )}
        <div className="absolute left-3 top-3">
          <Badge tone={asset.status === "ready" ? "success" : "warm"}>
            {asset.status === "ready" ? "已就绪" : asset.upload.status === "processing" ? "处理中" : "待处理"}
          </Badge>
        </div>
        <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2 py-1 text-[11px] font-bold text-studio-primaryStrong shadow-sm">
          {asset.storage.provider}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-studio-text">{asset.name}</h3>
            <p className="mt-1 text-xs font-semibold text-studio-muted">
              {kindLabel[asset.kind]} · {mediaLabel}
            </p>
          </div>
          <span className="shrink-0 text-xs font-bold text-studio-muted">{asset.usageCount}</span>
        </div>
        <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-studio-muted">{asset.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {asset.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-studio-primarySoft px-2 py-1 text-xs font-bold text-studio-primaryStrong">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-studio-borderSoft pt-3 text-[11px] font-bold text-studio-muted">
          <span>{asset.workflows.includes("video") ? "视频" : "资产"}</span>
          <span>{asset.workflows.includes("realtime") ? "实时可用" : "素材引用"}</span>
        </div>
      </div>
    </button>
  );
}
