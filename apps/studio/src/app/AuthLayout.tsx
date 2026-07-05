import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  subtitle: string;
  title: string;
};

export function AuthLayout({ children, subtitle, title }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-studio-background px-4 py-10 text-studio-text">
      <section className="w-full max-w-md rounded-xl border border-studio-border bg-white p-8 shadow-studio">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-studio-primary to-[#22C7B8] shadow-inner" />
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
