import type { ReactNode } from "react";

type BadgeTone = "primary" | "warm" | "blue" | "neutral" | "success";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
};

const toneClass: Record<BadgeTone, string> = {
  primary: "border-studio-primarySoft bg-studio-primarySoft/60 text-studio-primaryStrong",
  warm: "border-violet-100 bg-studio-actionSoft text-violet-700",
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  neutral: "border-slate-200 bg-slate-50 text-slate-600",
  success: "border-emerald-100 bg-emerald-50 text-emerald-700",
};

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold ${toneClass[tone]}`}>
      {children}
    </span>
  );
}
