import { Badge } from "../../shared/ui/Badge";
import type { StudioProject } from "../../entities/project";

type ProjectListProps = {
  projects: StudioProject[];
};

const statusLabel: Record<StudioProject["status"], string> = {
  archived: "已归档",
  draft: "草稿",
  failed: "失败",
  generating: "生成中",
  published: "已发布",
  ready: "已就绪",
};

const typeLabel: Record<StudioProject["type"], string> = {
  realtime: "实时数字人",
  solution_kit: "方案项目",
  video: "视频项目",
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="divide-y divide-studio-borderSoft">
      {projects.map((project) => (
        <article key={project.id} className="flex items-center justify-between gap-4 py-4">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-studio-text">{project.name}</h3>
            <p className="mt-1 text-xs font-semibold text-studio-muted">
              {typeLabel[project.type]} · {new Date(project.updatedAt).toLocaleString("zh-CN", { hour12: false })}
            </p>
          </div>
          <Badge tone={project.status === "generating" ? "warm" : project.status === "published" ? "blue" : "success"}>
            {statusLabel[project.status]}
          </Badge>
        </article>
      ))}
    </div>
  );
}
