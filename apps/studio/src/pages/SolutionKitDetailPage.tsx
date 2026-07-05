import { getAssetsByIds } from "../entities/asset";
import { getSolutionKitById, solutionKits } from "../entities/solution-kit";
import { AssetGrid } from "../features/assets/AssetGrid";
import { Button } from "../shared/ui/Button";
import { Card, CardHeader, CardTitle } from "../shared/ui/Card";
import { Badge } from "../shared/ui/Badge";

type SolutionKitDetailPageProps = {
  id?: string;
  onNavigate: (path: string) => void;
};

export function SolutionKitDetailPage({ id, onNavigate }: SolutionKitDetailPageProps) {
  const kit = getSolutionKitById(id ?? "") ?? solutionKits[0];
  const assets = getAssetsByIds(kit.assetIds);

  return (
    <div className="grid gap-5">
      <Card className="grid gap-6 bg-gradient-to-br from-white via-studio-primarySoft/70 to-studio-actionSoft p-6 xl:grid-cols-[1fr_360px]">
        <div>
          <Badge tone="primary">{kit.tags[0]}</Badge>
          <h1 className="mt-4 text-2xl font-bold text-studio-text">{kit.name}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-studio-muted">{kit.description}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {kit.actions.map((action, index) => (
              <Button key={action.href} variant={index === 0 ? "primary" : "secondary"} onClick={() => onNavigate(action.href)}>
                {action.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-white/70 bg-white/75">
          <img src={kit.coverImageUrl} alt={kit.name} className="h-52 w-full object-cover" />
          <div className="p-5">
          <p className="text-sm font-bold text-studio-primaryStrong">推荐比例</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {kit.recommendedAspectRatios.map((ratio) => (
              <Badge key={ratio}>{ratio}</Badge>
            ))}
          </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle subtitle="这些资产全部来自本地目录，后续可替换成云端对象存储和授权状态。">方案资产组成</CardTitle>
        </CardHeader>
        <div className="p-5">
          <AssetGrid assets={assets} />
        </div>
      </Card>
    </div>
  );
}
