import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { notFound } from "next/navigation";
import { Figure } from "@/components/Figure";
import { experience, experienceTiles, nowBuilding, profile, skills } from "@/content/profile";

export function generateStaticParams() {
  return experienceTiles.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const tile = experienceTiles.find((x) => x.slug === slug);
  return tile ? { title: tile.title } : {};
}

function Header({ title, blurb, meta, link }: { title: string; blurb: string; meta: string; link?: { href: string; label: string } }) {
  return (
    <header className="mt-10 mb-10 flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-[640px]">
        <h1 className="font-serif text-[clamp(48px,7.5vw,112px)] leading-[0.9] font-medium tracking-[-0.015em]">{title}</h1>
        <p className="mt-3 text-[17px] text-muted">{blurb}</p>
      </div>
      <div className="flex items-center gap-5 text-[14px] text-muted">
        <span>{meta}</span>
        {link && (
          <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-fg underline decoration-faint underline-offset-4 hover:decoration-fg">
            {link.label} ↗
          </a>
        )}
      </div>
    </header>
  );
}

const body = "max-w-[680px] text-[17px] leading-[1.8] text-fg/85";

export default async function ExperienceItem({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tile = experienceTiles.find((t) => t.slug === slug);
  if (!tile) notFound();

  const wolf = experience.find((e) => e.company === "Wolf Advanced Technology")!;

  return (
    <Container>
    <article className="relative pt-36 sm:pt-44">
      <span className="brush pointer-events-none absolute top-20 right-0 text-[220px] opacity-[0.12] select-none sm:text-[420px]" lang="zh-Hans" aria-hidden>历</span>
      <Link href="/experience" className="tracked text-[10px] text-muted transition-colors hover:text-vermilion">
        Back to experience
      </Link>

      {slug === "portfo" && (
        <>
          <Header title="Portfo" blurb={tile.blurb} meta="" link={{ href: nowBuilding.href, label: "portfo.dev" }} />
          <Figure src="/work/portfo-landing.jpg" alt="The Portfo landing page" tint="#0e0e10" priority />
          <p className={`${body} mt-12`}>{nowBuilding.pitch}</p>
          <div className="mt-12">
            <Figure src="/work/portfo-studio.jpg" alt="Portfo Studio" tint="#0e0e10" />
          </div>
        </>
      )}

      {slug === "wolf" && (
        <>
          <Header title={wolf.company} blurb={`${wolf.role}, ${wolf.type}`} meta={wolf.location} />
          <p className={body}>{wolf.summary}</p>
          <ul className="mt-8 max-w-[640px] space-y-3">
            {wolf.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-fg/85">
                <span className="text-faint">–</span>
                {h}
              </li>
            ))}
          </ul>
        </>
      )}

      {slug === "uoft" && (
        <>
          <Header title={profile.education.school} blurb={profile.education.program} meta="Toronto" />
          <p className={body}>{profile.philosophy}</p>
          <div className="mt-12 grid max-w-[900px] gap-8 sm:grid-cols-2">
            {skills.map((g) => (
              <div key={g.label}>
                <h2 className="text-[14px] text-muted capitalize">{g.label}</h2>
                <p className="mt-1.5 text-[15px] leading-relaxed">{g.items.join(", ")}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </article>
    </Container>
  );
}
