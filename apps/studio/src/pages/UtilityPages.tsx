import { invitationCodes } from "../entities/auth";
import { demoUser } from "../entities/user";
import { Badge } from "../shared/ui/Badge";
import { Button } from "../shared/ui/Button";
import { Card, CardHeader, CardTitle } from "../shared/ui/Card";

type UtilityPageProps = {
  description: string;
  eyebrow: string;
  title: string;
};

export function UtilityPage({ description, eyebrow, title }: UtilityPageProps) {
  if (eyebrow === "Users") {
    return <UserManagementPage />;
  }

  return (
    <Card className="bg-gradient-to-br from-white via-studio-primarySoft/70 to-studio-actionSoft p-6">
      <Badge tone="neutral">{eyebrow}</Badge>
      <h1 className="mt-4 text-2xl font-bold text-studio-text">{title}</h1>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-studio-muted">{description}</p>
      <div className="mt-5">
        <Button variant="primary">提交申请</Button>
      </div>
    </Card>
  );
}

function UserManagementPage() {
  return (
    <div className="grid gap-5">
      <Card className="bg-gradient-to-br from-white via-studio-primarySoft/70 to-studio-actionSoft p-6">
        <Badge tone="primary">Users</Badge>
        <h1 className="mt-4 text-2xl font-bold text-studio-text">用户管理</h1>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-studio-muted">
          管理可体验 Studio 的用户、邀请码和团队权限。当前为前端内测壳层，后续接入后端用户系统。
        </p>
        <div className="mt-5">
          <Button variant="primary">生成邀请码</Button>
        </div>
      </Card>

      <section className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle subtitle="只有邀请码验证通过的用户才能进入 Studio。">已验证用户</CardTitle>
          </CardHeader>
          <div className="divide-y divide-studio-borderSoft px-5">
            {[demoUser].map((user) => (
              <div key={user.id} className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="text-sm font-bold text-studio-text">{user.name}</p>
                  <p className="mt-1 text-xs font-semibold text-studio-muted">{user.workspaceName}</p>
                </div>
                <Badge tone="success">已验证</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle subtitle="用于内测、试用和客户邀请。">邀请码</CardTitle>
          </CardHeader>
          <div className="grid gap-3 p-5">
            {invitationCodes.map((code) => (
              <div key={code.code} className="rounded-xl border border-studio-border bg-white/90 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold tracking-wide text-studio-text">{code.code}</p>
                    <p className="mt-1 text-xs font-semibold text-studio-muted">{code.label}</p>
                  </div>
                  <Badge tone="warm">{code.usedSeats}/{code.maxSeats}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
