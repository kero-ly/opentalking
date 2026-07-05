import { useEffect, useState } from "react";
import { clearStudioSession, readStudioSession, saveStudioSession, type StudioSession } from "../entities/auth";
import { AssetLibraryPage } from "../pages/AssetLibraryPage";
import { AuthRequiredPage } from "../pages/AuthRequiredPage";
import { AuthPage, getAuthCopy } from "../pages/AuthPages";
import { CreateRealtimePage } from "../pages/CreateRealtimePage";
import { CreateVideoPage } from "../pages/CreateVideoPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { SolutionKitDetailPage } from "../pages/SolutionKitDetailPage";
import { SolutionKitsPage } from "../pages/SolutionKitsPage";
import { UtilityPage } from "../pages/UtilityPages";
import { WorkspacePage } from "../pages/WorkspacePage";
import { AuthLayout } from "./AuthLayout";
import { findStudioRoute, isRoutePublic, type StudioRouteId } from "./routes";
import { StudioLayout } from "./StudioLayout";

function readPathname(): string {
  return window.location.pathname;
}

function routeParam(pathname: string): string | undefined {
  return pathname.split("/").filter(Boolean)[1];
}

function pageForRoute(routeId: StudioRouteId, pathname: string, onNavigate: (path: string) => void) {
  switch (routeId) {
    case "workspace":
      return <WorkspacePage onNavigate={onNavigate} />;
    case "createVideo":
      return <CreateVideoPage />;
    case "createRealtime":
      return <CreateRealtimePage />;
    case "assets":
      return <AssetLibraryPage />;
    case "assetAvatars":
      return <AssetLibraryPage kind="avatar" title="数字形象" />;
    case "assetVoices":
      return <AssetLibraryPage kind="voice" title="声音资产" />;
    case "assetScenes":
      return <AssetLibraryPage kind="scene" title="场景资产" />;
    case "assetBackgrounds":
      return <AssetLibraryPage kind="background" title="背景资产" />;
    case "assetKnowledge":
      return <AssetLibraryPage kind="knowledge" title="知识库" />;
    case "solutions":
      return <SolutionKitsPage onNavigate={onNavigate} />;
    case "solutionDetail":
      return <SolutionKitDetailPage id={routeParam(pathname)} onNavigate={onNavigate} />;
    case "projects":
    case "projectDetail":
      return <ProjectsPage />;
    case "billing":
      return <UtilityPage eyebrow="Billing" title="计费与额度" description="管理言币、生成分钟数、套餐升级和企业合同申请。" />;
    case "team":
      return <UtilityPage eyebrow="Users" title="用户管理" description="邀请成员、分配资产权限，并统一管理团队项目。" />;
    case "apiAccess":
      return <UtilityPage eyebrow="API" title="API 与私有化" description="申请实时数字人 API、嵌入组件和私有化部署支持。" />;
    case "settings":
      return <UtilityPage eyebrow="Settings" title="空间设置" description="配置账号资料、品牌偏好、通知和默认创作参数。" />;
    default:
      return <WorkspacePage onNavigate={onNavigate} />;
  }
}

export function App() {
  const [pathname, setPathname] = useState(readPathname);
  const [session, setSession] = useState<StudioSession | null>(() => readStudioSession());
  const route = findStudioRoute(pathname);

  useEffect(() => {
    const onPopState = () => setPathname(readPathname());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (path: string) => {
    const nextUrl = new URL(path, window.location.origin);
    if (window.location.pathname !== nextUrl.pathname || window.location.search !== nextUrl.search) {
      window.history.pushState(null, "", path);
    }
    setPathname(window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAuthenticated = (nextSession: StudioSession) => {
    saveStudioSession(nextSession);
    setSession(nextSession);
    navigate("/workspace");
  };

  const handleSignOut = () => {
    clearStudioSession();
    setSession(null);
    navigate("/workspace");
  };

  if (route.section === "auth") {
    const mode = route.id === "register" ? "register" : route.id === "trial" ? "trial" : "login";
    const copy = getAuthCopy(mode);
    return (
      <AuthLayout title={copy.title} subtitle={copy.subtitle}>
        <AuthPage mode={mode} onAuthenticated={handleAuthenticated} />
      </AuthLayout>
    );
  }

  return (
    <StudioLayout activeRouteId={route.id} onNavigate={navigate} onSignOut={handleSignOut} session={session}>
      {!session?.invitationVerified && !isRoutePublic(route.id) ? (
        <AuthRequiredPage onNavigate={navigate} />
      ) : (
        pageForRoute(route.id, pathname, navigate)
      )}
    </StudioLayout>
  );
}
