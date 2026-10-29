import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { Figure } from "@/components/Figure";
import { getProjectBySlug } from "@/content/projects";
import { orderedProjects } from "@/content/order";

export function generateStaticParams() {
  return orderedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProjectBySlug((await params).slug);
  return p ? { title: p.title, description: p.shortDescription } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();

  const figures = (project.images ?? []).filter((f) => f.src !== project.cover.src);
  const paragraphs = project.writeup ?? [project.overview];
  // spread the pictures through the write-up
  const every = figures.length ? Math.max(1, Math.floor(paragraphs.length / (figures.length + 1))) : Infinity;
  let placed = 0;

  const index = orderedProjects.findIndex((p) => p.slug === project.slug);
  const next = orderedProjects[(index + 1) % orderedProjects.length];

  return (
    <Container>
    <article className="relative pt-36 sm:pt-44">
      <span className="brush pointer-events-none absolute top-20 right-0 text-[220px] opacity-[0.12] select-none sm:text-[420px]" lang="zh-Hans" aria-hidden>作</span>
      <Link href="/projects" className="tracked text-[10px] text-muted transition-colors hover:text-vermilion">
        Back to projects
      </Link>

      <header className="mt-10 mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-[640px]">
          <h1 className="font-serif text-[clamp(48px,7.5vw,112px)] leading-[0.9] font-medium tracking-[-0.015em]">{project.title}</h1>
          <p className="mt-3 text-[18px] text-muted">{project.blurb}</p>
        </div>
        <div className="flex items-center gap-5 text-[14px] text-muted">
          {project.link && (
            <a href={project.link.href} target="_blank" rel="noopener noreferrer" className="text-fg underline decoration-faint underline-offset-4 hover:decoration-fg">
              {project.link.label}
            </a>
          )}
        </div>
      </header>

      <Figure src={project.cover.src} alt={project.cover.alt} tint={project.cover.tint} priority />

      <div className="mt-12">
        {paragraphs.map((para, i) => {
          const figure = (i + 1) % every === 0 && placed < figures.length ? figures[placed++] : null;
          return (
            <Fragment key={i}>
              <p className="mb-6 max-w-[680px] text-[17px] leading-[1.8] text-fg/85">{para}</p>
              {figure && (
                <div className="my-12">
                  <Figure {...figure} />
                </div>
              )}
            </Fragment>
          );
        })}
        {figures.slice(placed).map((f) => (
          <div key={f.src} className="my-12">
            <Figure {...f} />
          </div>
        ))}
      </div>

      <Link href={`/projects/${next.slug}`} className="group mt-28 block border-t border-line pt-8">
        <span className="tracked text-[10px] text-faint">Next project</span>
        <span className="mt-3 block font-serif text-[clamp(40px,6vw,88px)] leading-[0.95] font-medium transition-colors group-hover:text-vermilion">
          {next.title}
        </span>
      </Link>
    </article>
    </Container>
  );
}
