import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;          // Renders as <Link> if provided
  external?: boolean;     // Opens in new tab (used with href)
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  // Navy background — "Join Our Community", "Register", "Give Today"
  primary:
    "bg-navy text-white hover:bg-tertiary-dark focus-visible:ring-navy",
  // Yellow background — "Register Now", "Join Newsletter", "Discover M3+"
  secondary:
    "bg-yellow text-neutral-900 hover:bg-yellow/80 focus-visible:ring-yellow",
  // Outlined — used for less prominent actions
  outline:
    "border-2 border-navy text-navy bg-transparent hover:bg-navy hover:text-white focus-visible:ring-navy",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-btn font-heading font-bold",
    "transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
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
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
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
