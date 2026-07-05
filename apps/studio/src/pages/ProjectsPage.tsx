import { studioProjects } from "../entities/project";
import { ProjectList } from "../features/projects/ProjectList";
import { Badge } from "../shared/ui/Badge";
import { Card, CardHeader, CardTitle } from "../shared/ui/Card";

export function ProjectsPage() {
  return (
    <div className="grid gap-5">
      <Card className="p-6">
        <Badge tone="blue">Projects</Badge>
        <h1 className="mt-4 text-2xl font-bold text-studio-text">项目与作品</h1>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-studio-muted">
          统一管理视频创作、实时数字人 Demo、方案包派生项目和导出记录。
        </p>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle subtitle="生成、发布、导出和复用都从项目开始。">最近项目</CardTitle>
        </CardHeader>
        <div className="px-5">
          <ProjectList projects={studioProjects} />
        </div>
      </Card>
    </div>
  );
}
