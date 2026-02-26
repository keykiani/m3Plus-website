/**
 * Avatar — circular photo with initials fallback.
 * Matches the Figma avatar component.
 *
 * Usage:
 *   <Avatar src="/images/team/melody.jpg" alt="Melody Ramey" size="lg" />
 *   <Avatar name="Melody Ramey" size="md" />   // initials fallback
 */

import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?:       string;
  alt?:       string;
  name?:      string;   // Used for initials fallback and aria-label
  size?:      AvatarSize;
  className?: string;
}

const sizeMap: Record<AvatarSize, { px: number; text: string }> = {
  xs: { px: 28,  text: "text-xs" },
  sm: { px: 40,  text: "text-sm" },
  md: { px: 56,  text: "text-base" },
  lg: { px: 80,  text: "text-xl" },
  xl: { px: 120, text: "text-3xl" },
};

/** Turn "Melody Ramey" → "MR" */
function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function Avatar({
  src,
  alt,
  name,
  size = "md",
  className,
}: AvatarProps) {
  const { px, text } = sizeMap[size];
  const label = alt ?? name ?? "Avatar";

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        "overflow-hidden rounded-full bg-primary-subtle border-2 border-primary/20",
        className
      )}
      style={{ width: px, height: px }}
      aria-label={label}
    >
      {src ? (
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover"
          sizes={`${px}px`}
        />
      ) : name ? (
        <span
          className={cn(
            "font-heading font-bold text-primary select-none",
            text
          )}
          aria-hidden="true"
        >
          {getInitials(name)}
        </span>
      ) : (
        // Blank grey circle if nothing provided
        <span className="sr-only">{label}</span>
      )}
    </div>
  );
}
