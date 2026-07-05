import { useState } from "react";
import { createStudioSession, invitationCodes, type StudioSession } from "../entities/auth";
import { Button } from "../shared/ui/Button";

type AuthPageProps = {
  mode: "login" | "register" | "trial";
  onAuthenticated: (session: StudioSession) => void;
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

export function AuthPage({ mode, onAuthenticated }: AuthPageProps) {
  const current = copy[mode];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const submit = () => {
    const result = createStudioSession({ email, invitationCode, password });
    if (!result.ok) {
      setMessage(result.message);
      return;
    }
    setMessage(null);
    onAuthenticated(result.session);
  };

  return (
    <form className="grid gap-4">
      <label className="grid gap-1.5 text-sm font-bold text-studio-text">
        手机号或邮箱
        <input
          className="h-11 rounded-lg border border-studio-border bg-white px-3 text-sm font-semibold text-studio-text"
          placeholder="name@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label className="grid gap-1.5 text-sm font-bold text-studio-text">
        密码
        <input
          className="h-11 rounded-lg border border-studio-border bg-white px-3 text-sm font-semibold text-studio-text"
          placeholder="至少 6 位"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <label className="grid gap-1.5 text-sm font-bold text-studio-text">
        邀请码
        <input
          className="h-11 rounded-lg border border-studio-border bg-white px-3 text-sm font-semibold uppercase tracking-wide text-studio-text"
          placeholder="OT-STUDIO-2026"
          value={invitationCode}
          onChange={(event) => setInvitationCode(event.target.value)}
        />
      </label>
      {message ? (
        <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-bold text-red-700">{message}</p>
      ) : null}
      <Button className="mt-2 w-full" variant="primary" type="button" onClick={submit}>
        {current.action}
      </Button>
      <p className="text-center text-xs leading-5 text-studio-muted">
        内测演示码：{invitationCodes[0].code}。正式环境会改为后端校验。
      </p>
      <div className="flex justify-center gap-3 text-xs font-bold text-studio-primary">
        {mode !== "login" ? <a href="/login">已有账号，去登录</a> : null}
        {mode !== "register" ? <a href="/register">注册账号</a> : null}
        {mode !== "trial" ? <a href="/trial">领取试用</a> : null}
      </div>
    </form>
  );
}

export function getAuthCopy(mode: AuthPageProps["mode"]) {
  return copy[mode];
}
