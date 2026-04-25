import Image from "next/image";
import { cn } from "@/lib/utils";

interface M3LogoProps {
  /** Width in pixels — height scales automatically from the ~52:44 aspect ratio */
  size?: number;
  /** Light variant (white logo) for dark backgrounds */
  variant?: "dark" | "light";
  className?: string;
}

export default function M3Logo({
  size = 48,
  variant = "dark",
  className,
}: M3LogoProps) {
  const src =
    variant === "light"
      ? "/images/logos/logo wht final_1 3.png"
      : "/images/logos/logo blk final_1 2.png";

  // Aspect ratio from Figma: ~52 × 44 px
  const height = Math.round(size * (44 / 52));

  return (
    <Image
      src={src}
      alt="M3+ Mutual Mentoring logo"
      width={size}
      height={height}
      className={cn("shrink-0", className)}
    />
  );
}
