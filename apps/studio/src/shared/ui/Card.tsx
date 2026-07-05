import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <section className={`rounded-xl border border-studio-border bg-white/90 shadow-sm ${className}`}>
      {children}
    </section>
  );
}

export function CardHeader({ action, children }: { action?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-studio-borderSoft px-5 py-4">
      <div className="min-w-0">{children}</div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function CardTitle({ children, subtitle }: { children: ReactNode; subtitle?: ReactNode }) {
  return (
    <>
      <h2 className="text-base font-bold tracking-normal text-studio-text">{children}</h2>
      {subtitle ? <p className="mt-1 text-sm leading-6 text-studio-muted">{subtitle}</p> : null}
    </>
  );
}
