import type { SolutionKit } from "../../entities/solution-kit";
import { Badge } from "../../shared/ui/Badge";
import { Button } from "../../shared/ui/Button";

type SolutionKitCardProps = {
  kit: SolutionKit;
  onOpen: (id: string) => void;
};

const toneClass: Record<SolutionKit["coverTone"], string> = {
  mint: "from-studio-primarySoft to-cyan-100",
  blue: "from-blue-100 to-sky-200",
  warm: "from-studio-actionSoft to-violet-100",
  mixed: "from-studio-primarySoft via-blue-100 to-studio-actionSoft",
};

export function SolutionKitCard({ kit, onOpen }: SolutionKitCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-studio-border bg-white shadow-sm">
      <div className={`h-32 bg-gradient-to-br ${toneClass[kit.coverTone]} p-4`}>
        <Badge tone="primary">{kit.tags[0]}</Badge>
      </div>
      <div className="p-5">
        <h3 className="text-base font-bold text-studio-text">{kit.name}</h3>
        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-studio-muted">{kit.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {kit.recommendedAspectRatios.map((ratio) => (
            <Badge key={ratio} tone="neutral">{ratio}</Badge>
          ))}
        </div>
        <Button className="mt-5 w-full" variant="secondary" onClick={() => onOpen(kit.id)}>
          查看方案
        </Button>
      </div>
    </article>
  );
}
