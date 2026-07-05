import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-studio-primary text-white shadow-[0_14px_24px_rgba(15,118,110,0.18)] hover:bg-studio-primaryStrong",
  secondary: "border-studio-border bg-white text-studio-text hover:border-studio-primary/40 hover:bg-studio-mint",
  ghost: "border-transparent bg-transparent text-studio-muted hover:bg-white/80 hover:text-studio-text",
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
