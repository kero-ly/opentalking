import type { StudioAsset } from "../../entities/asset";
import { AssetCard } from "./AssetCard";

type AssetGridProps = {
  assets: StudioAsset[];
};

export function AssetGrid({ assets }: AssetGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
}
