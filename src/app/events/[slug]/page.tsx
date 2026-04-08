import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, Presentation } from "lucide-react";
import { getEventBySlug, getArchiveEvents } from "@/lib/markdown";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import type { ResourceLink } from "@/lib/types";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const events = await getArchiveEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventBySlug(params.slug, "archive");
  return {
    title: event.title,
    description: event.description,
  };
}

/**
 * Converts a Google Slides share URL to an embeddable iframe URL.
 * Returns null if the URL is not a Google Slides link.
 */
function getGoogleSlidesEmbedUrl(url: string): string | null {
  if (!url.includes("docs.google.com/presentation")) return null;
  const match = url.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
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
