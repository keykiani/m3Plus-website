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

import { useState, useId } from "react";
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
  /** Unique per instance, so two accordions on one page can't collide. */
  const baseId = useId();

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className={cn("w-full", className)} role="list">
      {items.map((item, i) => {
        const isOpen    = openIndex === i;
        const triggerId = `${baseId}-trigger-${i}`;
        const panelId   = `${baseId}-panel-${i}`;

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
              id={triggerId}
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
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

            {/* ── Content — grid-rows animation, no height ceiling ──────
                grid-rows-[1fr]/[0fr] animates to the content's natural height,
                so there is no max-height to outgrow. `invisible` is what keeps
                collapsed content out of the tab order if an answer ever gains a
                link — the exact bug that hit the mobile nav drawer. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={cn(
                "grid overflow-hidden",
                "transition-[grid-template-rows,opacity,visibility] duration-300 ease-in-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100 visible"
                  : "grid-rows-[0fr] opacity-0 invisible"
              )}
            >
              <div
                className={cn(
                  "min-h-0 font-body leading-relaxed text-base",
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
