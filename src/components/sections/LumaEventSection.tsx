"use client";

/**
 * LumaEventSection
 *
 * Embeds a Luma event (or calendar) iframe in the homepage "Next Event" slot.
 *
 * AUTO-UPDATING: To make this section update automatically every month when
 * a new event is posted, replace the URL in src/lib/siteConfig.ts with your
 * Luma CALENDAR embed URL (not a single-event URL).
 *
 * Calendar embed URL format:
 *   https://lu.ma/embed/calendar/cal-xxxxxxxxxxxxxxxx/simple
 *
 * Find it in Luma → your calendar → Settings → Share → Embed.
 */

interface LumaEventSectionProps {
  embedUrl: string;
  sectionLabel?: string;
}

export default function LumaEventSection({
  embedUrl,
  sectionLabel = "Don't Miss Our Next Event!",
}: LumaEventSectionProps) {
  return (
    <section className="bg-neutral-100 section-pad" aria-label="Upcoming event">
      <div className="container-content">
        <p className="text-sm font-heading font-bold tracking-widest uppercase text-primary mb-6">
          {sectionLabel}
        </p>

        {/*
          Responsive iframe wrapper.
          The iframe expands to fill the container width up to 760px.
          Height is fixed at 450px — Luma's "simple" embed is a fixed-height card.
        */}
        <div className="w-full max-w-[760px]">
          <iframe
            src={embedUrl}
            width="100%"
            height="450"
            frameBorder="0"
            style={{
              border: "1px solid #bfcbda88",
              borderRadius: "12px",       // matches M3+ --radius-card
              display: "block",
              width: "100%",
            }}
            allow="fullscreen; payment"
            aria-label="M3+ upcoming event details via Luma"
            title="M3+ Upcoming Event"
            loading="lazy"
          />
        </div>

        {/* Fallback link for users who can't see the embed */}
        <p className="mt-4 text-sm text-neutral-700 font-body">
          Can&apos;t see the embed?{" "}
          <a
            href="https://lu.ma/m3plus"   /* ← update with your Luma calendar public URL */
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-tertiary-dark transition-colors"
          >
            View events on Luma
          </a>
        </p>
      </div>
    </section>
  );
}
