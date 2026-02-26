/**
 * Badge — matches the Figma badge component.
 * Variants: primary (blue), secondary (yellow), success (green),
 *           warning (amber), error (red), neutral (gray)
 */

import { cn } from "@/lib/utils";

type BadgeVariant = "primary" | "secondary" | "success" | "warning" | "error" | "neutral";

interface BadgeProps {
  children:  React.ReactNode;
  variant?:  BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary:   "bg-primary-subtle   text-primary   ring-1 ring-primary/20",
  secondary: "bg-secondary-subtle text-foreground ring-1 ring-secondary/30",
  success:   "bg-success-subtle   text-success-dark ring-1 ring-success/20",
  warning:   "bg-warning-subtle   text-warning-dark ring-1 ring-warning/20",
  error:     "bg-error-subtle     text-error-dark  ring-1 ring-error/20",
  neutral:   "bg-neutral-subtle   text-neutral-dark ring-1 ring-neutral/20",
};

export default function Badge({
  children,
  variant = "neutral",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5",
        "text-xs font-heading font-bold rounded-pill",
        "uppercase tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
