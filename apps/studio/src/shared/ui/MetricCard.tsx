import type { ReactNode } from "react";

type MetricCardProps = {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
};

export function MetricCard({ hint, icon, label, value }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-studio-border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-studio-muted">{label}</p>
        {icon ? <span className="text-studio-primary">{icon}</span> : null}
      </div>
      <p className="mt-3 text-2xl font-bold tracking-normal text-studio-text">{value}</p>
      {hint ? <p className="mt-1 text-xs leading-5 text-studio-muted">{hint}</p> : null}
    </div>
  );
}
