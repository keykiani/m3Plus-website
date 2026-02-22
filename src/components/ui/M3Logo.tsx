/**
 * M3+ Mutual Mentoring Logo Component
 *
 * Replace the SVG path data below with your actual logo once exported from Figma.
 * Export from Figma: Select logo → Right panel → Export → SVG → Copy SVG code.
 *
 * Accepts a `size` (px) or `className` prop for flexible scaling.
 */

import { cn } from "@/lib/utils";

interface M3LogoProps {
  /** Width/height in pixels (maintains aspect ratio) */
  size?: number;
  /** Light variant for dark backgrounds */
  variant?: "dark" | "light";
  className?: string;
}

export default function M3Logo({
  size = 48,
  variant = "dark",
  className,
}: M3LogoProps) {
  const color = variant === "light" ? "#FFFFFF" : "#122849";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="M3+ Mutual Mentoring logo"
      role="img"
      className={cn("shrink-0", className)}
    >
      {/* ── Placeholder circle — replace with actual logo SVG ── */}
      <circle cx="50" cy="50" r="48" fill={color} />
      <text
        x="50"
        y="44"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={variant === "light" ? "#122849" : "#FFFFFF"}
        fontFamily="Manrope, sans-serif"
        fontWeight="800"
        fontSize="26"
      >
        M3+
      </text>
      <text
        x="50"
        y="66"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={variant === "light" ? "#122849" : "#FFFFFF"}
        fontFamily="Manrope, sans-serif"
        fontWeight="600"
        fontSize="9"
        letterSpacing="1.5"
      >
        MUTUAL MENTORING
      </text>
    </svg>
  );
}
