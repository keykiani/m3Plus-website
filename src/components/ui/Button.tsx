import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

// Variants match the Figma primitives:
//   primary   → solid blue  (#2977BD)
//   secondary → solid yellow (#FFED89)
//   outline   → bordered, transparent
//   ghost     → no border, subtle hover
//   danger    → red destructive action
type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size    = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  Variant;
  size?:     Size;
  href?:     string;
  external?: boolean;
  children:  ReactNode;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  // Blue — primary actions (Register, Join, Submit)
  primary:
    "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark focus-visible:ring-primary",
  // Yellow — high-visibility CTAs (Join Newsletter, Discover M3+)
  secondary:
    "bg-secondary text-foreground hover:bg-secondary-dark active:bg-secondary-dark focus-visible:ring-secondary",
  // Outlined — bordered with primary colour, fills on hover
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white active:bg-primary active:text-white focus-visible:ring-primary",
  // Ghost — low-emphasis, no border, subtle background on hover
  ghost:
    "bg-transparent text-neutral-900 hover:bg-neutral-subtle active:bg-neutral-subtle focus-visible:ring-neutral",
  // Danger — destructive actions
  danger:
    "bg-error text-white hover:bg-error-dark active:bg-error-dark focus-visible:ring-error",
};

const sizeStyles: Record<Size, string> = {
  sm:   "px-4 py-2 text-sm",
  md:   "px-6 py-3 text-base",
  lg:   "px-8 py-4 text-lg",
  icon: "p-2",
};

export default function Button({
  variant  = "primary",
  size     = "md",
  href,
  external = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-btn font-heading font-bold",
    "transition-all duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
