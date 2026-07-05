import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  subtitle: string;
  title: string;
};

export function AuthLayout({ children, subtitle, title }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_10%_8%,#ECEBFF_0,transparent_32%),radial-gradient(circle_at_92%_10%,#FFE8F1_0,transparent_34%),linear-gradient(120deg,#F8F5FF_0%,#FFFFFF_48%,#FFF3F8_100%)] px-4 py-10 text-studio-text">
      <section className="w-full max-w-md rounded-xl border border-studio-border bg-white/90 p-8 shadow-studio backdrop-blur">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-studio-primary to-studio-actionEnd shadow-inner" />
          <div>
            <p className="text-lg font-bold text-studio-text">OpenTalking</p>
            <p className="text-xs font-semibold text-studio-muted">Studio</p>
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-normal text-studio-text">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-studio-muted">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </section>
    </main>
  );
}
