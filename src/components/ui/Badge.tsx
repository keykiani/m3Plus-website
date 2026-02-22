import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "neutral";
  className?: string;
}

const variantStyles = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-yellow/40 text-neutral-900",
  neutral: "bg-neutral-200 text-neutral-700",
};

export default function Badge({ children, variant = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-xs font-heading font-bold rounded-pill uppercase tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
