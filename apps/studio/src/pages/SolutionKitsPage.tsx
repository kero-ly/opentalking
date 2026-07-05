import { solutionKits } from "../entities/solution-kit";
import { SolutionKitCard } from "../features/solution-kits/SolutionKitCard";
import { Badge } from "../shared/ui/Badge";
import { Card } from "../shared/ui/Card";

type SolutionKitsPageProps = {
  onNavigate: (path: string) => void;
};

export function SolutionKitsPage({ onNavigate }: SolutionKitsPageProps) {
  return (
    <div className="grid gap-5">
      <Card className="bg-gradient-to-br from-white via-studio-primarySoft/70 to-studio-actionSoft p-6">
        <Badge tone="warm">Solution Kits</Badge>
        <h1 className="mt-4 text-2xl font-bold text-studio-text">解决方案包</h1>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-studio-muted">
          把形象、音色、背景、知识库、脚本模板和运行预设组合成行业方案，让用户从业务场景开始。
        </p>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        {solutionKits.map((kit) => (
          <SolutionKitCard key={kit.id} kit={kit} onOpen={(id) => onNavigate(`/solutions/${id}`)} />
        ))}
      </div>
    </div>
  );
}
