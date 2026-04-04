import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Made by Site Squad",
  description: "Meet the team that designed and built the M3+ website.",
  robots: { index: false, follow: false },
};

interface SquadMember {
  name: string;
  role: string;
  photo?: string;
  href?: string;
}

const squadMembers: SquadMember[] = [
  { name: "Name TBD", role: "Role TBD", photo: undefined, href: undefined },
  { name: "Name TBD", role: "Role TBD", photo: undefined, href: undefined },
  { name: "Name TBD", role: "Role TBD", photo: undefined, href: undefined },
  { name: "Name TBD", role: "Role TBD", photo: undefined, href: undefined },
  { name: "Name TBD", role: "Role TBD", photo: undefined, href: undefined },
  { name: "Name TBD", role: "Role TBD", photo: undefined, href: undefined },
];

const missionStatement =
  "Site Squad is a group of designers and developers who came together to craft a digital home for M3+. Our mission is to build thoughtful, accessible experiences that amplify communities doing meaningful work — turning ideas into beautifully functional realities, one project at a time.";

export default function SiteSquadPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-sky grid-bg section-pad">
        <div className="container-content">
          <p className="text-sm font-heading font-bold tracking-widest uppercase text-primary mb-3">
            Behind the Scenes
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight max-w-2xl mb-4">
            Made by Site Squad
          </h1>
          <p className="text-xl text-neutral font-body leading-relaxed max-w-xl">
            Six designers and developers who brought the M3+ vision to life on the web.
          </p>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────────── */}
      <section className="bg-cream section-pad">
        <div className="container-content max-w-3xl">
          <p className="text-sm font-heading font-bold tracking-widest uppercase text-primary mb-3">
            Our Mission
          </p>
          <p className="text-neutral font-body text-lg leading-relaxed">
            {missionStatement}
          </p>
        </div>
      </section>

      {/* ── Team Grid ─────────────────────────────────────────────── */}
      <section className="bg-neutral-100 section-pad">
        <div className="container-content">
          <SectionHeader title="The Squad" className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {squadMembers.map((member, index) => {
              const card = (
                <article
                  key={index}
                  className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col"
                >
                  {/* Polaroid photo area */}
                  <div className="p-4">
                    <div className="relative aspect-square bg-primary-subtle flex items-center justify-center">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={member.name}
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
                    <p className="text-primary font-body text-sm font-semibold">
                      {member.role}
                    </p>
                  </div>
                </article>
              );

              return member.href ? (
                <Link
                  key={index}
                  href={member.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm hover:translate-y-[-2px] transition-transform"
                >
                  {card}
                </Link>
              ) : (
                <div key={index}>{card}</div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
