import type { StudioAsset } from "../../entities/asset";
import { AssetCard } from "./AssetCard";

type AssetGridProps = {
  assets: StudioAsset[];
  selectedAssetId?: string;
  onSelectAsset?: (asset: StudioAsset) => void;
};

export function AssetGrid({ assets, onSelectAsset, selectedAssetId }: AssetGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} isSelected={asset.id === selectedAssetId} onSelect={onSelectAsset} />
      ))}
    </div>
  );
}
