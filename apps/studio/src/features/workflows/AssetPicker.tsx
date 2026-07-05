import { Check, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { StudioAsset } from "../../entities/asset";
import { Badge } from "../../shared/ui/Badge";

type AssetPickerProps = {
  title: string;
  description?: string;
  assets: StudioAsset[];
  selectedAssetId?: string;
  onSelect: (asset: StudioAsset) => void;
};

const kindLabel: Record<StudioAsset["kind"], string> = {
  avatar: "形象",
  voice: "音色",
  background: "背景",
  scene: "场景",
  knowledge: "知识库",
  persona: "人设",
  script_template: "脚本",
  runtime_preset: "运行",
  export_video: "视频",
};

export function AssetPicker({ assets, description, onSelect, selectedAssetId, title }: AssetPickerProps) {
  const [query, setQuery] = useState("");
  const filteredAssets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return assets;
    return assets.filter((asset) => `${asset.name} ${asset.description} ${asset.tags.join(" ")}`.toLowerCase().includes(normalizedQuery));
  }, [assets, query]);

  return (
    <section className="rounded-xl border border-studio-border bg-white/90 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-studio-text">{title}</h2>
          {description ? <p className="mt-1 text-sm leading-6 text-studio-muted">{description}</p> : null}
        </div>
        <Badge tone="primary">{assets.length}</Badge>
      </div>

      <label className="mt-4 flex items-center gap-2 rounded-lg border border-studio-border bg-white px-3 py-2 text-sm text-studio-muted">
        <Search className="h-4 w-4" aria-hidden />
        <span className="sr-only">搜索{title}</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索资产"
          className="min-w-0 flex-1 bg-transparent font-semibold text-studio-text outline-none placeholder:text-studio-muted"
        />
      </label>

      <div className="mt-4 grid max-h-[420px] gap-2 overflow-y-auto pr-1">
        {filteredAssets.map((asset) => {
          const selected = asset.id === selectedAssetId;
          return (
            <button
              key={asset.id}
              type="button"
              onClick={() => onSelect(asset)}
              className={`flex items-center gap-3 rounded-lg border p-2 text-left transition-colors ${
                selected ? "border-studio-primary bg-studio-primarySoft/70" : "border-studio-border bg-white hover:border-studio-primary/40"
              }`}
            >
              <span className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-studio-primarySoft">
                {asset.preview.imageUrl ? <img src={asset.preview.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" /> : null}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-studio-text">{asset.name}</span>
                <span className="mt-1 block truncate text-xs font-semibold text-studio-muted">
                  {kindLabel[asset.kind]} · {asset.storage.provider}
                </span>
              </span>
              {selected ? <Check className="h-4 w-4 shrink-0 text-studio-primary" aria-hidden /> : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
