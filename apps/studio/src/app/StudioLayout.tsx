import {
  Bell,
  Boxes,
  CreditCard,
  FileVideo,
  Gauge,
  HelpCircle,
  Home,
  KeyRound,
  Layers,
  Library,
  Mic2,
  Plus,
  Search,
  Settings,
  Sparkles,
  Users,
  Video,
  Wand2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { demoQuota, quotaUsagePercent } from "../entities/quota";
import { demoUser } from "../entities/user";
import type { StudioSession } from "../entities/auth";
import { getRoutePath, type StudioRouteId } from "./routes";
import { Button } from "../shared/ui/Button";

type StudioLayoutProps = {
  activeRouteId: StudioRouteId;
  children: ReactNode;
  onNavigate: (path: string) => void;
  onSignOut: () => void;
  session: StudioSession | null;
};

type NavItem = {
  id: StudioRouteId;
  icon: LucideIcon;
  label: string;
};

const mainItems: NavItem[] = [
  { id: "workspace", icon: Home, label: "首页" },
  { id: "createVideo", icon: FileVideo, label: "创建视频" },
  { id: "createRealtime", icon: Video, label: "实时数字人" },
  { id: "projects", icon: Library, label: "项目" },
];

const assetItems: NavItem[] = [
  { id: "assetAvatars", icon: Sparkles, label: "数字形象" },
  { id: "assetVoices", icon: Mic2, label: "声音资产" },
  { id: "assetScenes", icon: Layers, label: "场景资产" },
  { id: "assetBackgrounds", icon: Boxes, label: "背景资产" },
  { id: "assetKnowledge", icon: Wand2, label: "知识库" },
  { id: "solutions", icon: Gauge, label: "解决方案包" },
];

const workspaceItems: NavItem[] = [
  { id: "team", icon: Users, label: "用户管理" },
  { id: "billing", icon: CreditCard, label: "计费" },
  { id: "apiAccess", icon: KeyRound, label: "API 接入" },
  { id: "settings", icon: Settings, label: "设置" },
];

function NavGroup({
  activeRouteId,
  items,
  label,
  onNavigate,
}: {
  activeRouteId: StudioRouteId;
  items: NavItem[];
  label: string;
  onNavigate: (path: string) => void;
}) {
  return (
    <div>
      <p className="px-3 pb-2 pt-4 text-xs font-bold text-[#80909B]">{label}</p>
      <div className="grid gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.id === activeRouteId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(getRoutePath(item.id))}
              className={`flex min-h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-bold transition-colors ${
                active
                  ? "bg-white text-studio-primaryStrong shadow-[0_10px_24px_rgba(15,118,110,0.1)]"
                  : "text-slate-600 hover:bg-white/70 hover:text-studio-text"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function StudioLayout({ activeRouteId, children, onNavigate, onSignOut, session }: StudioLayoutProps) {
  const usagePercent = quotaUsagePercent(demoQuota);
  const currentUser = session?.user ?? demoUser;

  return (
    <div className="min-h-screen bg-studio-background text-studio-text">
      <div className="mx-auto flex min-h-screen max-w-[1680px]">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-studio-border bg-gradient-to-b from-studio-sidebar via-[#F7FFFD] to-white px-4 py-5 lg:flex">
          <button type="button" onClick={() => onNavigate(getRoutePath("workspace"))} className="flex items-center gap-3 px-2 pb-3 text-left">
            <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-studio-primary to-[#22C7B8] shadow-inner" />
            <span>
              <span className="block text-base font-bold text-slate-950">OpenTalking</span>
              <span className="block text-xs font-semibold text-studio-muted">Studio</span>
            </span>
          </button>

          <Button
            variant="primary"
            className="mt-2 w-full"
            icon={<Plus className="h-4 w-4" aria-hidden />}
            onClick={() => onNavigate(getRoutePath("createVideo"))}
          >
            创建
          </Button>

          <nav className="mt-3 min-h-0 flex-1 overflow-y-auto" aria-label="Studio 导航">
            <NavGroup activeRouteId={activeRouteId} items={mainItems} label="工作台" onNavigate={onNavigate} />
            <NavGroup activeRouteId={activeRouteId} items={assetItems} label="资产" onNavigate={onNavigate} />
            <NavGroup activeRouteId={activeRouteId} items={workspaceItems} label="空间" onNavigate={onNavigate} />
          </nav>

          <section className="mt-4 rounded-xl border border-sky-100 bg-gradient-to-br from-white to-cyan-50 p-4">
            <p className="text-sm font-bold text-studio-text">{demoQuota.planName}</p>
            <p className="mt-1 text-xs leading-5 text-studio-muted">本月剩余 {demoQuota.remainingMinutes} 分钟生成额度。</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-gradient-to-r from-studio-primary to-sky-400" style={{ width: `${usagePercent}%` }} />
            </div>
          </section>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex min-h-16 items-center justify-between gap-4 border-b border-studio-border bg-white/80 px-4 backdrop-blur md:px-6">
            <div className="hidden min-w-72 max-w-xl flex-1 items-center gap-2 rounded-lg border border-studio-border bg-white px-3 py-2 text-sm font-semibold text-slate-400 md:flex">
              <Search className="h-4 w-4" aria-hidden />
              <span>搜索数字人、音色、背景、行业方案</span>
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-between gap-3 md:flex-none md:justify-end">
              <button
                type="button"
                className="rounded-full border border-violet-100 bg-studio-actionSoft px-3 py-2 text-sm font-bold text-violet-700"
                onClick={() => onNavigate(getRoutePath("billing"))}
              >
                {demoQuota.coinBalance} 言币
              </button>
              <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg border border-studio-border bg-white text-studio-muted hover:text-studio-text" aria-label="通知">
                <Bell className="h-4 w-4" aria-hidden />
              </button>
              <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg border border-studio-border bg-white text-studio-muted hover:text-studio-text" aria-label="帮助">
                <HelpCircle className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => onNavigate(getRoutePath("settings"))}
                className="flex min-w-0 items-center gap-2 rounded-full border border-violet-100 bg-gradient-to-br from-white to-studio-actionSoft py-1 pl-1 pr-3"
              >
                <span className="relative h-9 w-9 rounded-full bg-gradient-to-br from-studio-primary to-studio-actionEnd">
                  <span className="absolute inset-x-2 bottom-2 top-2 rounded-full rounded-b-lg bg-white/85" />
                </span>
                <span className="hidden text-left sm:block">
                  <span className="block text-xs font-bold text-studio-text">{currentUser.name}</span>
                  <span className="block text-[11px] font-bold text-violet-700">{session?.invitationVerified ? "邀请码已验证" : "试用中"}</span>
                </span>
              </button>
              <Button className="hidden sm:inline-flex" variant="ghost" onClick={onSignOut}>
                退出
              </Button>
            </div>
          </header>

          <main className="min-w-0 flex-1 px-4 py-5 md:px-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
