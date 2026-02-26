"use client";

/**
 * Accordion — matches the Figma accordion component.
 *
 * Blue primary header + ChevronDown (Lucide) that rotates on open.
 * Smooth height animation via CSS max-height transition.
 *
 * Usage:
 *   <Accordion items={faqs} />                    // default blue headers
 *   <Accordion items={faqs} variant="subtle" />   // light border style
 */

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer:   string;
}

interface AccordionProps {
  items:     AccordionItem[];
  /** "bold"   → primary-blue header (Figma default)
   *  "subtle" → no fill, divider-only style               */
  variant?:  "bold" | "subtle";
  className?: string;
}

export default function Accordion({
  items,
  variant   = "bold",
  className,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className={cn("w-full", className)} role="list">
      {items.map((item, i) => {
        const isOpen = openIndex === i;

        return (
          <div
            key={i}
            role="listitem"
            className={cn(
              "rounded-btn overflow-hidden mb-3 last:mb-0",
              variant === "subtle" && "border-b border-neutral-200 rounded-none mb-0"
            )}
          >
            {/* ── Trigger ──────────────────────────────────────────── */}
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className={cn(
                "w-full flex items-center justify-between gap-4 px-5 py-4",
                "font-heading font-bold text-left transition-colors duration-150",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
                // Bold variant: primary-blue header (Figma accordion primitive)
                variant === "bold" && [
                  "bg-primary text-white rounded-btn",
                  isOpen && "rounded-b-none",
                ],
                // Subtle variant: no fill
                variant === "subtle" && [
                  "bg-transparent text-neutral-900 py-5 px-0",
                ]
              )}
            >
              <span className="text-base md:text-lg leading-snug">
                {item.question}
              </span>
              <ChevronDown
                size={20}
                aria-hidden="true"
                className={cn(
                  "shrink-0 transition-transform duration-300",
                  isOpen && "rotate-180",
                  variant === "bold"   && "text-white",
                  variant === "subtle" && "text-primary"
                )}
              />
            </button>

            {/* ── Content — CSS height animation ───────────────────── */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              )}
              aria-hidden={!isOpen}
            >
              <div
                className={cn(
                  "font-body leading-relaxed text-base",
                  variant === "bold"   && "bg-white text-neutral-700 px-5 py-4 rounded-b-btn border border-t-0 border-primary/20",
                  variant === "subtle" && "text-neutral-700 pb-5 px-0"
                )}
              >
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
