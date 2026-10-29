import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHead } from "@/components/PageHead";
import { ProjectTile } from "@/components/ProjectTile";
import { SectionHead } from "@/components/SectionHead";
import { TileGrid } from "@/components/Tile";
import { embeddedProjects, softwareProjects } from "@/content/order";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <Container>
      <PageHead glyph="作" title="Projects" sub="Software first. The embedded work underneath is where I learned what's going on all the way down." />
      <TileGrid>
        {softwareProjects.map((p, i) => (
          <ProjectTile key={p.slug} project={p} priority={i < 2} />
        ))}
      </TileGrid>
      <div className="pt-32">
        <SectionHead glyph="芯" title="Embedded" sub="FPGAs, RF, microcontrollers, and robots." />
      </div>
      <TileGrid>
        {embeddedProjects.map((p) => (
          <ProjectTile key={p.slug} project={p} />
        ))}
      </TileGrid>
    </Container>
  );
}
