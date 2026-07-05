import type { StudioAsset } from "../../entities/asset";
import { Badge } from "../../shared/ui/Badge";

type AssetCardProps = {
  asset: StudioAsset;
};

const toneClass: Record<StudioAsset["thumbnailTone"], string> = {
  mint: "from-studio-primarySoft to-cyan-100",
  blue: "from-blue-100 to-sky-200",
  warm: "from-studio-actionSoft to-violet-100",
  mixed: "from-studio-primarySoft via-blue-100 to-studio-actionSoft",
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

export function AssetCard({ asset }: AssetCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-studio-border bg-white shadow-sm transition-colors hover:border-studio-primary/40">
      <div className={`relative h-28 bg-gradient-to-br ${toneClass[asset.thumbnailTone]}`}>
        <div className="absolute inset-4 rounded-xl border border-white/60 bg-white/30 backdrop-blur-sm" />
        <Badge tone={asset.status === "ready" ? "success" : "warm"}>
          {asset.status === "ready" ? "已就绪" : "处理中"}
        </Badge>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-studio-text">{asset.name}</h3>
            <p className="mt-1 text-xs font-semibold text-studio-muted">{kindLabel[asset.kind]}</p>
          </div>
          <span className="shrink-0 text-xs font-bold text-studio-muted">{asset.usageCount}</span>
        </div>
        <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-studio-muted">{asset.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {asset.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-studio-mint px-2 py-1 text-xs font-bold text-studio-primaryStrong">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
