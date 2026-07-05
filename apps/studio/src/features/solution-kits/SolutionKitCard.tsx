import type { SolutionKit } from "../../entities/solution-kit";
import { Badge } from "../../shared/ui/Badge";
import { Button } from "../../shared/ui/Button";

type SolutionKitCardProps = {
  kit: SolutionKit;
  onNavigate?: (path: string) => void;
  onOpen: (id: string) => void;
};

const toneClass: Record<SolutionKit["coverTone"], string> = {
  mint: "from-studio-primarySoft to-white",
  blue: "from-indigo-100 to-violet-100",
  warm: "from-studio-actionSoft to-white",
  mixed: "from-studio-primarySoft via-white to-studio-actionSoft",
};

export function SolutionKitCard({ kit, onNavigate, onOpen }: SolutionKitCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-studio-border bg-white/90 shadow-sm">
      <div className={`relative h-36 bg-gradient-to-br ${toneClass[kit.coverTone]}`}>
        <img src={kit.coverImageUrl} alt={kit.name} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-studio-text/55 to-transparent" />
        <div className="absolute left-4 top-4">
        <Badge tone="primary">{kit.tags[0]}</Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-base font-bold text-studio-text">{kit.name}</h3>
        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-studio-muted">{kit.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {kit.recommendedAspectRatios.map((ratio) => (
            <Badge key={ratio} tone="neutral">{ratio}</Badge>
          ))}
        </div>
        <div className="mt-5 grid gap-2">
          {kit.actions.slice(0, 2).map((action, index) => (
            <Button key={action.href} className="w-full" variant={index === 0 ? "primary" : "secondary"} onClick={() => onNavigate?.(action.href)}>
              {action.label}
            </Button>
          ))}
          <Button className="w-full" variant="ghost" onClick={() => onOpen(kit.id)}>
            查看方案详情
          </Button>
        </div>
      </div>
    </article>
  );
}
