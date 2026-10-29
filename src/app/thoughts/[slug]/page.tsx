import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { notFound } from "next/navigation";
import { Figure } from "@/components/Figure";
import { formatDate, getThoughtBySlug, thoughts } from "@/content/thoughts";

export function generateStaticParams() {
  return thoughts.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = getThoughtBySlug((await params).slug);
  return t ? { title: t.title, description: t.summary } : {};
}

export default async function ThoughtPage({ params }: { params: Promise<{ slug: string }> }) {
  const thought = getThoughtBySlug((await params).slug);
  if (!thought) notFound();

  const index = thoughts.findIndex((t) => t.slug === thought.slug);
  const newer = thoughts[index - 1];
  const older = thoughts[index + 1];
  const figures: { src: string; alt: string; caption?: string }[] = thought.images ?? (thought.image ? [thought.image] : []);

  return (
    <Container>
    <article className="max-w-[760px] relative pt-36 sm:pt-44">
      <span className="brush pointer-events-none absolute top-20 right-0 text-[220px] opacity-[0.12] select-none sm:text-[420px]" lang="zh-Hans" aria-hidden>味</span>
      <Link href="/thoughts" className="tracked text-[10px] text-muted transition-colors hover:text-vermilion">
        Back to thoughts
      </Link>
      <header className="mt-10 mb-10">
        <p className="text-[14px] text-muted">{formatDate(thought.date)}</p>
        <h1 className="mt-2 font-serif text-[clamp(48px,7.5vw,112px)] leading-[0.9] font-medium tracking-[-0.015em]">{thought.title}</h1>
        {(thought.order || thought.rating) && (
          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 text-[14px]">
            {thought.order && (
              <div>
                <dt className="text-muted">Order</dt>
                <dd className="mt-0.5">{thought.order}</dd>
              </div>
            )}
            {thought.rating && (
              <div>
                <dt className="text-muted">Rating</dt>
                <dd className="mt-0.5">{thought.rating}</dd>
              </div>
            )}
          </dl>
        )}
      </header>

      <div className="space-y-6">
        {figures.map((f, i) => (
          <Figure key={f.src} {...f} priority={i === 0} />
        ))}
      </div>

      <div className="mt-10 space-y-6 text-[16px] leading-[1.75] text-fg/85">
        {thought.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <nav className="mt-20 flex justify-between gap-6 border-t border-line pt-6 text-[14px]">
        {older ? (
          <Link href={`/thoughts/${older.slug}`} className="text-muted hover:text-fg">
            ← {older.title}
          </Link>
        ) : (
          <span />
        )}
        {newer && (
          <Link href={`/thoughts/${newer.slug}`} className="text-right text-muted hover:text-fg">
            {newer.title} →
          </Link>
        )}
      </nav>
    </article>
    </Container>
  );
}
