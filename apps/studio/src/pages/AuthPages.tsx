import { Button } from "../shared/ui/Button";

type AuthPageProps = {
  mode: "login" | "register" | "trial";
};

const copy = {
  login: {
    title: "登录 Studio",
    subtitle: "进入你的数字人视频创作和资产管理工作台。",
    action: "登录",
  },
  register: {
    title: "创建账号",
    subtitle: "注册后即可试用数字人视频创作、资产托管和实时对话 Demo。",
    action: "注册",
  },
  trial: {
    title: "开始免费试用",
    subtitle: "使用推荐方案包快速体验 OpenTalking Studio 的创作流程。",
    action: "领取试用额度",
  },
} satisfies Record<AuthPageProps["mode"], { title: string; subtitle: string; action: string }>;

export function AuthPage({ mode }: AuthPageProps) {
  const current = copy[mode];
  return (
    <form className="grid gap-4">
      <label className="grid gap-1.5 text-sm font-bold text-studio-text">
        手机号或邮箱
        <input className="h-11 rounded-lg border border-studio-border bg-white px-3 text-sm font-semibold text-studio-text" placeholder="name@example.com" />
      </label>
      <label className="grid gap-1.5 text-sm font-bold text-studio-text">
        密码
        <input className="h-11 rounded-lg border border-studio-border bg-white px-3 text-sm font-semibold text-studio-text" placeholder="请输入密码" type="password" />
      </label>
      <Button className="mt-2 w-full" variant="primary" type="button">
        {current.action}
      </Button>
      <p className="text-center text-xs leading-5 text-studio-muted">{current.title} · {current.subtitle}</p>
    </form>
  );
}

export function getAuthCopy(mode: AuthPageProps["mode"]) {
  return copy[mode];
}
