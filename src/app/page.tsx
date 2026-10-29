import Link from "next/link";
import { ChatBox } from "@/components/chat/ChatBox";
import { Container } from "@/components/Container";
import { CrestBand } from "@/components/home/CrestBand";
import { Hero } from "@/components/home/Hero";
import { ProjectTile } from "@/components/ProjectTile";
import { SectionHead } from "@/components/SectionHead";
import { TileGrid } from "@/components/Tile";
import { softwareProjects } from "@/content/order";
import { profile } from "@/content/profile";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="ask" className="scroll-mt-10 py-28 sm:py-40">
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <span className="brush block text-[150px] sm:text-[220px]" lang="zh-Hans" aria-hidden>
              问
            </span>
            <h2 className="mt-6 font-serif text-[clamp(40px,5vw,72px)] leading-[0.95] font-medium">Ask anything</h2>
            <p className="mt-5 max-w-[380px] text-[16px] leading-relaxed text-muted">
              An assistant that has read every project, the resume, and every food review on this site. It answers about me
              in the third person and admits when it doesn&apos;t know.
            </p>
          </div>
          <div className="lg:pt-24">
            <ChatBox />
          </div>
        </Container>
      </section>

      <CrestBand text={profile.philosophy.charAt(0).toUpperCase() + profile.philosophy.slice(1)} />

      <section className="pt-32 pb-10 sm:pt-44">
        <Container>
          <SectionHead
            glyph="作"
            title="Selected work"
            sub="Things I've built for the web, in the browser, and for making music."
            action={
              <Link href="/projects" className="tracked border-b border-fg/30 pb-1 text-[11px] transition-colors hover:border-vermilion hover:text-vermilion">
                All projects
              </Link>
            }
          />
          <TileGrid>
            {softwareProjects.map((p, i) => (
              <ProjectTile key={p.slug} project={p} index={i} priority={i < 2} />
            ))}
          </TileGrid>
        </Container>
      </section>
    </>
  );
}
