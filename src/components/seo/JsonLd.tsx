/**
 * Renders a JSON-LD structured-data block.
 *
 * Server component — the payload is serialized at build time and inlined into
 * the page HTML so crawlers see it without executing JavaScript.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // `<` is escaped so a stray "</script>" inside any content field can't
      // break out of the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
