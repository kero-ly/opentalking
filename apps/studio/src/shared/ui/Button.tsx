import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-studio-action text-white shadow-[0_14px_24px_rgba(255,107,134,0.28)] hover:bg-studio-actionStrong",
  secondary: "border-studio-border bg-white text-studio-primaryStrong shadow-sm hover:border-studio-primary/40 hover:bg-studio-primarySoft/60",
  ghost: "border-transparent bg-transparent text-studio-muted hover:bg-white/80 hover:text-studio-primaryStrong",
};

export function Button({ children, className = "", icon, type = "button", variant = "secondary", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClass[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
