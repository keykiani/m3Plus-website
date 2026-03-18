"use client";

/**
 * LumaEventSection
 *
 * Embeds a Luma event (or calendar) iframe in the homepage "Next Event" slot.
 *
 * AUTO-UPDATING: Replace siteConfig.lumaEmbedUrl with your Luma CALENDAR embed
 * URL so this section updates automatically each month:
 *   https://lu.ma/embed/calendar/cal-xxxxxxxxxxxxxxxx/simple
 * Find it in Luma → your calendar → Settings → Share → Embed.
 */

interface LumaEventSectionProps {
  embedUrl: string;
  sectionLabel?: string;
  sectionSubtext?: string;
}

export default function LumaEventSection({
  embedUrl,
  sectionLabel = "Don't Miss Our Next Event!",
  sectionSubtext = "Join fellow designers for learning, networking, and community building.",
}: LumaEventSectionProps) {
  return (
    <section className="bg-neutral-100 section-pad" aria-labelledby="luma-heading">
      <div className="container-content">
        <h2
          id="luma-heading"
          className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 leading-tight mb-3"
        >
          {sectionLabel}
        </h2>
        <p className="text-lg text-neutral-700 font-body mb-8 max-w-xl">
          {sectionSubtext}
        </p>

        <div className="w-full max-w-[760px]">
          <iframe
            src={embedUrl}
            width="100%"
            height="450"
            frameBorder="0"
            style={{
              border: "1px solid #bfcbda88",
              borderRadius: "12px",
              display: "block",
              width: "100%",
            }}
            allow="fullscreen; payment"
            aria-label="M3+ upcoming event details via Luma"
            title="M3+ Upcoming Event"
            loading="lazy"
          />
        </div>

        <p className="mt-4 text-sm text-neutral-700 font-body">
          Can&apos;t see the embed?{" "}
          <a
            href="https://lu.ma/m3plus"
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
