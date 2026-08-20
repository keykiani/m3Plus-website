import type { Metadata } from "next";
import { getMarkdownFile, getTeamMembers, getTestimonials } from "@/lib/markdown";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import Avatar from "@/components/ui/Avatar";
import Accordion from "@/components/ui/Accordion";
import JsonLd from "@/components/seo/JsonLd";
import { defaultOgImages } from "@/lib/siteConfig";
import { faqSchema } from "@/lib/schema";
import TestimonialBlock from "@/components/sections/TestimonialBlock";

const description =
  "Learn about M3+ Mutual Mentoring — our mission, values, team, and the free monthly design community we're building in Plano, Texas.";

export const metadata: Metadata = {
  title: "About Us",
  description,
  alternates: { canonical: "/about" },
  // Without an explicit openGraph block the page inherits the layout's
  // og:title/og:url, so shared links show the homepage instead.
  openGraph: {
    title: "About M3+ Mutual Mentoring",
    description,
    url: "/about",
    images: defaultOgImages,
  },
};

export default async function AboutPage() {
  const [{ data: about }, teamMembers, testimonials] = await Promise.all([
    getMarkdownFile("pages/about.md"),
    getTeamMembers(),
    getTestimonials(),
  ]);

  const a = about as {
    heroLabel:       string;
    heroHeadline:    string;
    heroSubtext:     string;
    whatIsHeadline:  string;
    whatIsBody:      string;
    whatIsImage:     string;
    whatIsImageAlt:  string;
    whatIsCtaLabel:  string;
    whatIsCtaHref:   string;
    missionImage:    string;
    missionImageAlt: string;
    missionHeadline: string;
    missionBody:     string;
    values: {
      title:       string;
      description: string;
      image:       string;
      imageAlt:    string;
      style:       string;
    }[];
    faqHeadline:     string;
    faqs:            { question: string; answer: string }[];
  };

  const testimonial1 = testimonials[0] ?? null;
  const testimonial2 = testimonials[1] ?? null;

  // Map value card style names → card background. Each card also carries the
  // black border and hard offset shadow used by the team and platform cards.
  const valueCardStyles: Record<string, string> = {
    cream: "bg-yellow",
    blue:  "bg-sky",
    green: "bg-mint",
    pink:  "bg-blush",
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-sky grid-bg section-pad">
        <div className="container-content">
          <p className="text-sm font-heading font-bold tracking-widest uppercase text-primary-dark mb-3">
            {a.heroLabel}
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight max-w-2xl mb-4">
            {a.heroHeadline}
          </h1>
          <p className="text-xl text-neutral font-body leading-relaxed max-w-xl">
            {a.heroSubtext}
          </p>
        </div>
      </section>

      {/* ── What is M3+? ──────────────────────────────────────────── */}
      <section className="bg-neutral-100 section-pad">
        <div className="container-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader title={a.whatIsHeadline} className="mb-6" />
            <p className="text-neutral font-body text-lg leading-relaxed mb-8">
              {a.whatIsBody}
            </p>
            <Button variant="primary" href={a.whatIsCtaHref}>
              {a.whatIsCtaLabel}
            </Button>
          </div>
          <div className="relative aspect-[4/3] rounded-card overflow-hidden bg-sky shadow-card">
            {a.whatIsImage && (
              <Image
                src={a.whatIsImage}
                alt={a.whatIsImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 640px"
              />
            )}
          </div>
        </div>
      </section>

      {/* ── Testimonial 1 ─────────────────────────────────────────── */}
      {testimonial1 && <TestimonialBlock testimonial={testimonial1} />}

      {/* ── Mission ───────────────────────────────────────────────── */}
      <section className="bg-cream section-pad">
        <div className="container-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-card overflow-hidden bg-sky shadow-card">
            {a.missionImage && (
              <Image
                src={a.missionImage}
                alt={a.missionImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 640px"
              />
            )}
          </div>
          <div>
            <p className="text-sm font-heading font-bold tracking-widest uppercase text-primary-dark mb-2">
              Our Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight mb-6">
              {a.missionHeadline}
            </h2>
            <p className="text-neutral font-body text-lg leading-relaxed">
              {a.missionBody}
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonial 2 ─────────────────────────────────────────── */}
      {testimonial2 && <TestimonialBlock testimonial={testimonial2} bgVariant="sky" />}

      {/* ── Our Values ── photo-and-text cards on a gridded blue field ── */}
      <section className="bg-light-blue grid-bg section-pad">
        <div className="container-content">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground uppercase tracking-wide mb-10">
            Our Values
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {a.values?.map((v, i) => (
              <div
                key={i}
                className={`border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col sm:flex-row gap-5 ${
                  valueCardStyles[v.style] ?? "bg-white"
                }`}
              >
                {/* Decorative: the value's own heading carries the meaning. */}
                <div className="relative w-full sm:w-40 lg:w-44 aspect-square shrink-0 overflow-hidden bg-white/40">
                  {v.image && (
                    <Image
                      src={v.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 176px"
                    />
                  )}
                </div>

                <div className="flex-1 sm:py-2">
                  <h3 className="font-heading font-bold text-lg lg:text-xl text-foreground leading-snug mb-3">
                    {v.title}
                  </h3>
                  <p className="font-body text-sm text-neutral leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Team ──────────────────────────────────────────────── */}
      <section className="bg-cream section-pad">
        <div className="container-content">
          <SectionHeader title="Our Team" className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
            {teamMembers.map((member) => (
              <article
                key={member.slug}
                className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                {/* Polaroid padding around photo */}
                <div className="p-4">
                  {/* Photo area — Avatar fills if no image */}
                  <div className="relative aspect-square bg-primary-subtle flex items-center justify-center mb-4">
                    {member.photo ? (
                      /* Decorative: the name is the <h3> directly below. */
                      <Image
                        src={member.photo}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <Avatar name={member.name} size="xl" />
                    )}
                  </div>
                </div>

                {/* Polaroid text area */}
                <div className="px-4 pb-6">
                  <h3 className="font-heading font-bold text-lg text-foreground mb-0.5">
                    {member.name}
                  </h3>
                  <p className="text-primary-dark font-body text-sm font-semibold mb-3">
                    {member.title}
                  </p>
                  <p className="text-neutral font-body text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── Figma Accordion (blue header + ChevronDown) ────── */}
      <section className="bg-neutral-100 section-pad">
        <div className="container-content max-w-3xl mx-auto">
          <SectionHeader title={a.faqHeadline} className="mb-10" />
          {a.faqs && (
            <>
              {/* Answers are present in the SSR HTML (the Accordion collapses
                  with CSS, it doesn't conditionally render), so this markup
                  matches what crawlers actually see. */}
              <JsonLd data={faqSchema(a.faqs)} />
              <Accordion
                items={a.faqs}
                variant="bold"
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}
