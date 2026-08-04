import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

// Variants match the Figma primitives:
//   primary   → solid blue  (#2977BD)
//   secondary → solid yellow (#F8F5E8)
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

// Shared hard-shadow hover effect (neo-brutalist lift)
const hardShadow =
  "hover:shadow-btn-hard hover:-translate-y-0.5 active:shadow-none active:translate-y-0";

const variantStyles: Record<Variant, string> = {
  // Blue — primary actions (Register, Join, Submit)
  primary:
    `bg-primary text-white hover:bg-primary-dark active:bg-primary-dark focus-visible:ring-primary ${hardShadow}`,
  // Yellow — high-visibility CTAs (Join Newsletter, Discover M3+)
  // Ring is primary, NOT secondary: ring-secondary (#F8F5E8) is the button's own
  // fill, which measured 1.04–1.09:1 against every surface it sits on. Since the
  // native outline is removed below, that made keyboard focus invisible.
  secondary:
    `bg-secondary text-foreground hover:bg-secondary-dark active:bg-secondary-dark focus-visible:ring-primary ${hardShadow}`,
  // Outlined — bordered with primary colour, fills on hover.
  // Label uses primary-dark: #2977BD label text measured 4.11:1 on bg-cream.
  // The border keeps `primary` — non-text only needs 3:1, which it clears.
  outline:
    `border-2 border-primary text-primary-dark bg-transparent hover:bg-primary hover:text-white active:bg-primary active:text-white focus-visible:ring-primary ${hardShadow}`,
  // Ghost — low-emphasis, no border, subtle background on hover (no hard shadow)
  ghost:
    "bg-transparent text-neutral-900 hover:bg-neutral-subtle active:bg-neutral-subtle focus-visible:ring-neutral",
  // Danger — destructive actions
  danger:
    `bg-error text-white hover:bg-error-dark active:bg-error-dark focus-visible:ring-error hover:shadow-btn-hard-danger hover:-translate-y-0.5 active:shadow-none active:translate-y-0`,
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
