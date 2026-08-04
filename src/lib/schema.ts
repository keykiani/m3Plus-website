import { siteConfig } from "./siteConfig";
import type { Event } from "./types";

/**
 * Schema.org JSON-LD builders.
 *
 * Kept separate from the components that render them so the shapes are easy to
 * eyeball against Google's Rich Results Test.
 */

/**
 * Default venue for M3+ events.
 *
 * Archive event markdown has no `location` field today (only `_template.md`
 * carries a placeholder), so this is the fallback. Sourced from the About page
 * FAQ: "Events rotate between in-person in Plano, Texas."
 */
const defaultPlace = {
  "@type": "Place",
  name: "Plano, Texas",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Plano",
    addressRegion: "TX",
    addressCountry: "US",
  },
};

export function organizationSchema() {
  const sameAs = Object.values(siteConfig.socialLinks).filter(
    (url): url is string => Boolean(url)
  );

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: "M3+",
    url: siteConfig.url,
    // The mark itself, not the OG card — Google's Organization logo guidance
    // expects the logo image.
    logo: `${siteConfig.url}/icon.png`,
    description: siteConfig.description,
    email: siteConfig.email,
    areaServed: defaultPlace,
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function eventSchema(event: Event) {
  const url = `${siteConfig.url}/events/${event.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.date,
    // Past events — all markdown-backed events live in the archive.
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: event.location
      ? { "@type": "Place", name: event.location }
      : defaultPlace,
    ...(event.image && { image: [`${siteConfig.url}${event.image}`] }),
    url,
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    // M3+ events are free — a genuine differentiator in event rich results.
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url,
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
