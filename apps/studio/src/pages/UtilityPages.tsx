import { Badge } from "../shared/ui/Badge";
import { Button } from "../shared/ui/Button";
import { Card } from "../shared/ui/Card";

type UtilityPageProps = {
  description: string;
  eyebrow: string;
  title: string;
};

export function UtilityPage({ description, eyebrow, title }: UtilityPageProps) {
  return (
    <Card className="bg-gradient-to-br from-white via-studio-mint to-studio-actionSoft/60 p-6">
      <Badge tone="neutral">{eyebrow}</Badge>
      <h1 className="mt-4 text-2xl font-bold text-studio-text">{title}</h1>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-studio-muted">{description}</p>
      <div className="mt-5">
        <Button variant="primary">提交申请</Button>
      </div>
    </Card>
  );
}
