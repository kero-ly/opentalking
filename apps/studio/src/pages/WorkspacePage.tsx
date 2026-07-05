import { FileVideo, Mic2, Presentation, Radio, Sparkles } from "lucide-react";
import { getFeaturedAssets } from "../entities/asset";
import { studioProjects } from "../entities/project";
import { demoQuota, quotaUsagePercent } from "../entities/quota";
import { solutionKits } from "../entities/solution-kit";
import { AssetGrid } from "../features/assets/AssetGrid";
import { ProjectList } from "../features/projects/ProjectList";
import { SolutionKitCard } from "../features/solution-kits/SolutionKitCard";
import { Badge } from "../shared/ui/Badge";
import { Button } from "../shared/ui/Button";
import { Card, CardHeader, CardTitle } from "../shared/ui/Card";
import { MetricCard } from "../shared/ui/MetricCard";

type WorkspacePageProps = {
  onNavigate: (path: string) => void;
};

export function WorkspacePage({ onNavigate }: WorkspacePageProps) {
  return (
    <div className="grid gap-5">
      <section className="grid gap-4 rounded-xl border border-studio-border bg-gradient-to-br from-studio-sidebar via-white to-studio-actionSoft/80 p-5 shadow-sm xl:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Badge tone="primary">OpenTalking Studio</Badge>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-normal text-slate-950">
            创建可对话、可生成、可复用的数字人内容资产
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-studio-muted">
            从数字形象、音色、背景、知识库到行业方案包，把零散能力组合成可交付的数字人视频和实时交互体验。
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="primary" icon={<FileVideo className="h-4 w-4" />} onClick={() => onNavigate("/create/video")}>
              创建数字人视频
            </Button>
            <Button icon={<Radio className="h-4 w-4" />} onClick={() => onNavigate("/create/realtime")}>
              创建实时对话 Demo
            </Button>
            <Button icon={<Sparkles className="h-4 w-4" />} onClick={() => onNavigate("/solutions")}>
              查看解决方案包
            </Button>
          </div>
        </div>
        <div className="relative min-h-64 overflow-hidden rounded-xl border border-white/70 bg-gradient-to-br from-studio-primarySoft via-blue-100 to-studio-actionSoft">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.52)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.52)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute left-5 top-5 rounded-full bg-white/85 px-3 py-2 text-xs font-bold text-studio-primaryStrong">实时对话 · 已就绪</div>
          <div className="absolute bottom-0 right-10 h-56 w-36 rounded-t-full bg-gradient-to-b from-white to-sky-100 shadow-2xl" />
          <div className="absolute bottom-5 left-5 right-28 rounded-xl border border-white/70 bg-white/80 p-4 text-sm leading-6 text-studio-text backdrop-blur">
            选择一个行业方案包，再替换形象、声音、背景和知识库。
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="剩余额度" value={`${demoQuota.remainingMinutes} 分钟`} hint={`${quotaUsagePercent(demoQuota)}% 已使用`} icon={<Radio className="h-4 w-4" />} />
        <MetricCard label="言币余额" value={`${demoQuota.coinBalance}`} hint="可用于视频生成与音色复刻" icon={<Sparkles className="h-4 w-4" />} />
        <MetricCard label="方案包" value={`${solutionKits.length}`} hint="电商、医疗、培训可快速开始" icon={<Presentation className="h-4 w-4" />} />
        <MetricCard label="最近项目" value={`${studioProjects.length}`} hint="包含视频与实时数字人项目" icon={<Mic2 className="h-4 w-4" />} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <CardHeader action={<Button variant="ghost" onClick={() => onNavigate("/assets")}>资产中心</Button>}>
            <CardTitle subtitle="按使用热度展示，可直接作为视频或实时数字人的素材。">推荐资产</CardTitle>
          </CardHeader>
          <div className="p-5">
            <AssetGrid assets={getFeaturedAssets(4)} />
          </div>
        </Card>

        <Card>
          <CardHeader action={<Button variant="ghost" onClick={() => onNavigate("/projects")}>全部项目</Button>}>
            <CardTitle subtitle="继续编辑、导出或发布最近的数字人项目。">最近项目</CardTitle>
          </CardHeader>
          <div className="px-5">
            <ProjectList projects={studioProjects} />
          </div>
        </Card>
      </section>

      <Card>
        <CardHeader action={<Button variant="ghost" onClick={() => onNavigate("/solutions")}>更多方案</Button>}>
          <CardTitle subtitle="把形象、音色、背景、知识库和脚本预设组合成行业资产。">精选解决方案包</CardTitle>
        </CardHeader>
        <div className="grid gap-4 p-5 md:grid-cols-3">
          {solutionKits.map((kit) => (
            <SolutionKitCard key={kit.id} kit={kit} onOpen={(id) => onNavigate(`/solutions/${id}`)} />
          ))}
        </div>
      </Card>
    </div>
  );
}
