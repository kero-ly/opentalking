import { LockKeyhole, Sparkles } from "lucide-react";
import { Button } from "../shared/ui/Button";
import { Card } from "../shared/ui/Card";

type AuthRequiredPageProps = {
  onNavigate: (path: string) => void;
};

export function AuthRequiredPage({ onNavigate }: AuthRequiredPageProps) {
  return (
    <Card className="overflow-hidden">
      <div className="grid gap-6 bg-gradient-to-br from-white via-studio-primarySoft/70 to-studio-actionSoft p-6 lg:grid-cols-[1fr_360px]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-studio-primarySoft bg-white/80 px-3 py-1 text-xs font-bold text-studio-primaryStrong">
            <LockKeyhole className="h-3.5 w-3.5" aria-hidden />
            需要登录
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-normal text-studio-text">登录后即可创建数字人</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-studio-muted">
            你可以先浏览工作台、资产中心和解决方案包。开始创建视频、实时数字人或管理用户时，需要登录并验证邀请码。
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => onNavigate("/login")}>
              登录
            </Button>
            <Button onClick={() => onNavigate("/register")}>注册账号</Button>
            <Button variant="ghost" onClick={() => onNavigate("/workspace")}>
              继续浏览工作台
            </Button>
          </div>
        </div>
        <div className="relative min-h-56 overflow-hidden rounded-xl border border-white/70 bg-gradient-to-br from-studio-primarySoft via-white to-studio-actionSoft">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.52)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.52)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <Sparkles className="absolute left-5 top-5 h-8 w-8 text-studio-primary" aria-hidden />
          <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/82 p-4 text-sm font-bold leading-6 text-studio-text backdrop-blur">
            公开预览负责展示价值，创建动作再引导登录。
          </div>
        </div>
      </div>
    </Card>
  );
}
