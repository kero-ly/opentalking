import { getSolutionKitById, solutionKits } from "../entities/solution-kit";
import { Button } from "../shared/ui/Button";
import { Card, CardHeader, CardTitle } from "../shared/ui/Card";
import { Badge } from "../shared/ui/Badge";

type SolutionKitDetailPageProps = {
  id?: string;
};

export function SolutionKitDetailPage({ id }: SolutionKitDetailPageProps) {
  const kit = getSolutionKitById(id ?? "") ?? solutionKits[0];

  return (
    <div className="grid gap-5">
      <Card className="grid gap-6 bg-gradient-to-br from-white via-studio-primarySoft/70 to-studio-actionSoft p-6 xl:grid-cols-[1fr_360px]">
        <div>
          <Badge tone="primary">{kit.tags[0]}</Badge>
          <h1 className="mt-4 text-2xl font-bold text-studio-text">{kit.name}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-studio-muted">{kit.description}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="primary">使用此方案创建项目</Button>
            <Button>保存为自定义副本</Button>
          </div>
        </div>
        <div className="rounded-xl border border-white/70 bg-gradient-to-br from-studio-primarySoft via-white to-studio-actionSoft p-5">
          <p className="text-sm font-bold text-studio-primaryStrong">推荐比例</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {kit.recommendedAspectRatios.map((ratio) => (
              <Badge key={ratio}>{ratio}</Badge>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle subtitle="后续会展示每个组成资产的替换和授权状态。">方案资产组成</CardTitle>
        </CardHeader>
        <div className="grid gap-3 p-5 md:grid-cols-2 xl:grid-cols-4">
          {kit.assetIds.map((assetId) => (
            <div key={assetId} className="rounded-xl border border-studio-border bg-white/90 p-4 text-sm font-bold text-studio-text">
              {assetId}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
