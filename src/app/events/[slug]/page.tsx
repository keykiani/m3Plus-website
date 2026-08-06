import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, Presentation } from "lucide-react";
import { getEventBySlug, getArchiveEvents } from "@/lib/markdown";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, eventSchema } from "@/lib/schema";
import { defaultOgImages } from "@/lib/siteConfig";
import type { ResourceLink } from "@/lib/types";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const events = await getArchiveEvents();
  return events.map((e) => ({ slug: e.slug }));
}

/**
 * Only the slugs from generateStaticParams may be rendered. `getEventBySlug`
 * interpolates this param into a filesystem path, so leaving the default
 * (`true`) would let an on-demand request for `../..`-style slug traverse
 * outside content/ on the Netlify SSR runtime.
 */
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventBySlug(params.slug, "archive");
  const canonical = `/events/${params.slug}`;

  return {
    title: event.title,
    description: event.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: event.title,
      description: event.description,
      url: canonical,
      // Fall back to the site card so an event without its own image still
      // shares with a picture rather than none.
      images: event.image ? [{ url: event.image }] : defaultOgImages,
    },
  };
}

/**
 * Converts a Google Slides share URL to an embeddable iframe URL.
 * Returns null if the URL is not a Google Slides link.
 */
function getGoogleSlidesEmbedUrl(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  // Match on the parsed hostname, not a substring of the whole URL — otherwise
  // `https://evil.com/#docs.google.com/presentation/d/X` slips past the guard.
  if (parsed.hostname !== "docs.google.com") return null;

  const match = parsed.pathname.match(/^\/presentation\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;

  // Only the extracted ID is reused; the origin is hardcoded, so the iframe src
  // can never become a javascript:/data: URI or a third-party origin.
  return `https://docs.google.com/presentation/d/${match[1]}/embed?start=false&loop=false`;
}

export default async function EventResourcesPage({ params }: Props) {
  const event = await getEventBySlug(params.slug, "archive");

  const slidesEmbedUrl = event.slideshowUrl
    ? getGoogleSlidesEmbedUrl(event.slideshowUrl)
    : null;

  const hasSlideshowContent = !!event.slideshowUrl;

  return (
    <>
      <JsonLd data={eventSchema(event)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Events", path: "/events" },
          { name: event.title, path: `/events/${params.slug}` },
        ])}
      />

      {/* ── Back nav ──────────────────────────────────────────────── */}
      <div className="bg-neutral-100 border-b border-neutral-200">
        <div className="container-content py-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-neutral-700 hover:text-primary font-body text-sm transition-colors"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Events
          </Link>
        </div>
      </div>

      {/* ── Page header ── the page's h1, plus the event's own copy so
             it isn't just a grid of outbound links. ─────────────────── */}
      <section className="bg-neutral-100 pt-10 pb-2">
        <div className="container-content">
          <SectionHeader as="h1" label="Event Recap" title={event.title} />
          {event.displayDate && (
            <p className="mt-4 text-sm font-heading font-bold uppercase tracking-widest text-neutral-700">
              <time dateTime={event.date}>
                {`${event.displayDate}${event.year ? `, ${event.year}` : ""}`}
              </time>
              {event.location && <> · {event.location}</>}
            </p>
          )}
          {event.description && (
            <p className="mt-4 max-w-2xl text-lg text-neutral-700 font-body leading-relaxed">
              {event.description}
            </p>
          )}
        </div>
      </section>

      {/* ── Slideshow Viewer ──────────────────────────────────────── */}
      {hasSlideshowContent && (
        <section className="bg-neutral-100 section-pad">
          <div className="container-content">
            <SectionHeader title={`${event.title} Slideshow`} className="mb-8" />

            {slidesEmbedUrl ? (
              /* Google Slides embed */
              <div className="relative w-full aspect-video rounded-card overflow-hidden shadow-card-hover mb-6 bg-sky">
                <iframe
                  src={slidesEmbedUrl}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  allow="fullscreen"
                  // No `allow-top-navigation` — the embed cannot redirect the tab.
                  sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={`${event.title} slideshow`}
                  loading="lazy"
                />
              </div>
            ) : (
              /* Non-Slides Drive/PDF link — just show a button */
              <div className="rounded-card bg-cream border border-neutral-200 p-10 text-center mb-6">
                <Presentation size={36} className="text-primary mx-auto mb-4" aria-hidden="true" />
                <p className="text-neutral font-body text-lg mb-6">
                  View the slideshow from this event.
                </p>
                <Button variant="primary" href={event.slideshowUrl!} external>
                  <ExternalLink size={16} aria-hidden="true" />
                  Open Slideshow
                </Button>
              </div>
            )}

            {/* Download / Open buttons */}
            <div className="flex flex-wrap gap-3">
              {event.pdfUrl && (
                <Button variant="primary" href={event.pdfUrl} external>
                  <Download size={16} aria-hidden="true" />
                  PDF Download
                </Button>
              )}
              {slidesEmbedUrl && (
                <Button variant="outline" href={event.slideshowUrl!} external>
                  <ExternalLink size={16} aria-hidden="true" />
                  Open in Google Slides
                </Button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Additional Links ──────────────────────────────────────── */}
      {event.resourceLinks && event.resourceLinks.length > 0 && (
        <section className="bg-cream section-pad">
          <div className="container-content">
            <SectionHeader title="Additional Links" className="mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {event.resourceLinks.map((link: ResourceLink, i: number) => (
                <div
                  key={i}
                  className="bg-white rounded-card border border-neutral-200 p-6 flex flex-col gap-3 shadow-card hover:shadow-card-hover transition-shadow"
                >
                  <span className="text-3xl" aria-hidden="true">{link.emoji}</span>
                  <h3 className="font-heading font-bold text-neutral-900">{link.title}</h3>
                  <p className="text-sm text-neutral-700 font-body leading-relaxed flex-1">
                    {link.description}
                  </p>
                  <Button variant="secondary" href={link.url} external size="sm">
                    {link.buttonLabel}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
