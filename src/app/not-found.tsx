import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-neutral-100 section-pad">
      <div className="container-content max-w-2xl text-center">
        <p className="text-sm font-heading font-bold tracking-widest uppercase text-primary mb-2">
          404
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 leading-tight">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-4 text-lg text-neutral-700 font-body leading-relaxed">
          The link may be out of date, or the page may have moved. Here are a few
          good places to pick things back up.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Button variant="primary" href="/">
            Back to Home
          </Button>
          <Button variant="outline" href="/events">
            Browse Events
          </Button>
          <Button variant="outline" href="/get-involved">
            Get Involved
          </Button>
        </div>
      </div>
    </section>
  );
}
