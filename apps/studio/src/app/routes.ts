export type StudioRouteId =
  | "login"
  | "register"
  | "trial"
  | "workspace"
  | "createVideo"
  | "createRealtime"
  | "assets"
  | "assetAvatars"
  | "assetVoices"
  | "assetScenes"
  | "assetBackgrounds"
  | "assetKnowledge"
  | "solutions"
  | "solutionDetail"
  | "projects"
  | "projectDetail"
  | "billing"
  | "team"
  | "apiAccess"
  | "settings";

export type StudioRoute = {
  id: StudioRouteId;
  path: string;
  label: string;
  section: "auth" | "main" | "assets" | "workspace";
};

export const STUDIO_ROUTES: StudioRoute[] = [
  { id: "login", path: "/login", label: "登录", section: "auth" },
  { id: "register", path: "/register", label: "注册", section: "auth" },
  { id: "trial", path: "/trial", label: "免费试用", section: "auth" },
  { id: "workspace", path: "/workspace", label: "首页", section: "main" },
  { id: "createVideo", path: "/create/video", label: "创建视频", section: "main" },
  { id: "createRealtime", path: "/create/realtime", label: "实时数字人", section: "main" },
  { id: "projects", path: "/projects", label: "项目", section: "main" },
  { id: "projectDetail", path: "/projects/:id", label: "项目详情", section: "main" },
  { id: "assets", path: "/assets", label: "资产中心", section: "assets" },
  { id: "assetAvatars", path: "/assets/avatars", label: "数字形象", section: "assets" },
  { id: "assetVoices", path: "/assets/voices", label: "声音资产", section: "assets" },
  { id: "assetScenes", path: "/assets/scenes", label: "场景资产", section: "assets" },
  { id: "assetBackgrounds", path: "/assets/backgrounds", label: "背景资产", section: "assets" },
  { id: "assetKnowledge", path: "/assets/knowledge", label: "知识库", section: "assets" },
  { id: "solutions", path: "/solutions", label: "解决方案包", section: "assets" },
  { id: "solutionDetail", path: "/solutions/:id", label: "方案详情", section: "assets" },
  { id: "billing", path: "/billing", label: "计费", section: "workspace" },
  { id: "team", path: "/team", label: "团队", section: "workspace" },
  { id: "apiAccess", path: "/api-access", label: "API 接入", section: "workspace" },
  { id: "settings", path: "/settings", label: "设置", section: "workspace" },
];

export function getRoutePath(id: StudioRouteId): string {
  return STUDIO_ROUTES.find((route) => route.id === id)?.path ?? "/workspace";
}

function matchParameterizedRoute(pattern: string, pathname: string): boolean {
  if (!pattern.includes(":")) return pattern === pathname;
  const patternParts = pattern.split("/");
  const pathParts = pathname.split("/");
  if (patternParts.length !== pathParts.length) return false;
  return patternParts.every((part, index) => part.startsWith(":") || part === pathParts[index]);
}

export function findStudioRoute(pathname: string): StudioRoute {
  if (pathname === "/") return STUDIO_ROUTES.find((route) => route.id === "workspace")!;
  return (
    STUDIO_ROUTES.find((route) => matchParameterizedRoute(route.path, pathname)) ??
    STUDIO_ROUTES.find((route) => route.id === "workspace")!
  );
}
