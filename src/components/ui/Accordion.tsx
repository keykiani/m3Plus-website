"use client";

/**
 * Accordion — neobrutalist: flat fills, 2px black borders, hard offset
 * shadows, square corners. Matches the team, value and platform cards, and
 * uses the same 4px/6px shadow steps already in the codebase.
 *
 * Blue primary header + ChevronDown (Lucide) that rotates on open.
 * Open/close animates grid-template-rows, so there is no height ceiling.
 *
 * IMPORTANT: the collapsed panel stays in the DOM (visibility, not unmount).
 * The About page's FAQPage JSON-LD asserts these answers, so they have to be
 * present in the server-rendered HTML — swapping in a library accordion that
 * unmounts collapsed content would silently invalidate that markup.
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
              // Neobrutalist shell: square corners, hard black border and a
              // solid offset shadow that deepens on hover.
              variant === "bold" && [
                "mb-4 last:mb-0 bg-white border-2 border-black",
                "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                "transition-[box-shadow,transform] duration-150",
                "hover:-translate-x-0.5 hover:-translate-y-0.5",
                "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
                "has-[:focus-visible]:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
              ],
              variant === "subtle" && "border-b border-neutral-200 mb-0"
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
                // Bold variant: flat blue fill, square, with a black rule
                // separating it from the panel once open.
                variant === "bold" && [
                  "bg-primary text-white hover:bg-primary-dark",
                  isOpen && "border-b-2 border-black",
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
              {/* Bold variant boxes the chevron in its own bordered tile —
                  the neobrutalist cue that this is the control. */}
              {variant === "bold" ? (
                <span
                  aria-hidden="true"
                  className="shrink-0 grid place-items-center w-8 h-8 bg-white border-2 border-black"
                >
                  <ChevronDown
                    size={18}
                    className={cn(
                      "text-primary-dark transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                  />
                </span>
              ) : (
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 text-primary transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                />
              )}
            </button>

            {/* ── Content — grid-rows animation, no height ceiling ──────
                grid-rows-[1fr]/[0fr] animates to the content's natural height,
                so there is no max-height to outgrow. `invisible` is what keeps
                collapsed content out of the tab order if an answer ever gains a
                link — the exact bug that hit the mobile nav drawer.

                The grid child must carry no padding of its own: `min-h-0` lets
                its content shrink to zero but does nothing about padding, so
                px-5/py-4 on this element kept the collapsed row at 32px instead
                of 0. The padding lives one level deeper. */}
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
              <div className="min-h-0 overflow-hidden">
                <div
                  className={cn(
                    "font-body leading-relaxed text-base",
                    variant === "bold"   && "bg-white text-neutral-700 px-5 py-4",
                    variant === "subtle" && "text-neutral-700 pb-5 px-0"
                  )}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
