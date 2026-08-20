"use client"

/**
 * Accordion — the neobrutalism.dev component, on Radix primitives.
 *
 * Two deliberate changes from the upstream source:
 *
 * 1. `forceMount` on Content, plus a grid-rows collapse instead of the
 *    upstream height animation. Radix unmounts collapsed content by default.
 *    The About page's FAQPage JSON-LD asserts every answer, and structured
 *    data may only describe content that is actually on the page — so the
 *    answers have to stay in the server-rendered HTML. Without this the
 *    markup would claim answers that aren't in the document, and it fails
 *    silently: the page looks right and the Rich Results Test still passes.
 *
 *    forceMount alone is not enough. Radix does NOT set `hidden` on a
 *    force-mounted panel, and `animate-accordion-up` has no forwards
 *    fill-mode, so height snaps back to auto once it finishes — measured at
 *    84px per closed panel, i.e. every answer visible at once. Animating
 *    grid-template-rows between 0fr and 1fr collapses cleanly in both
 *    directions with no initial flash, and `invisible` keeps collapsed
 *    answers out of the tab order and the accessibility tree while leaving
 *    them in the DOM for crawlers.
 *
 * 2. Theme classes mapped onto this project's tokens. Upstream targets the
 *    neobrutalism.dev theme (`bg-main`, `border-border`, `shadow-shadow`,
 *    `font-base`), none of which exist here — and `border` is already a
 *    light grey used site-wide, so reusing it would have produced grey
 *    borders instead of black. Structure and API are untouched.
 */

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import * as React from "react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "rounded-base overflow-hidden border-2 border-black shadow-shadow mb-4 last:mb-0",
        className,
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between gap-4 text-left text-base md:text-lg text-white border-black focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-dark focus-visible:ring-inset bg-primary hover:bg-primary-dark p-4 font-heading font-bold transition-all [&[data-state=open]>svg]:rotate-180 data-[state=open]:rounded-b-none data-[state=open]:border-b-2 disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="pointer-events-none size-5 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount
      className={cn(
        "grid overflow-hidden rounded-b-base bg-white text-neutral-700 text-base font-body leading-relaxed",
        "transition-[grid-template-rows,opacity,visibility] duration-200 ease-out",
        "data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100 data-[state=open]:visible",
        "data-[state=closed]:grid-rows-[0fr] data-[state=closed]:opacity-0 data-[state=closed]:invisible",
      )}
      {...props}
    >
      {/* Two wrappers, both load-bearing. The grid child must carry no padding
          of its own — `min-h-0` lets its content shrink to zero but does
          nothing about padding, so p-4 here would pin every collapsed row
          open at 32px. The padding lives on the inner element. */}
      <div className="min-h-0 overflow-hidden">
        <div className={cn("p-4", className)}>{children}</div>
      </div>
    </AccordionPrimitive.Content>
  )
}

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
