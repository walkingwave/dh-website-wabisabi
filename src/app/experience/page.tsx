import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHead } from "@/components/PageHead";
import { Tile, TileGrid } from "@/components/Tile";
import { experienceTiles } from "@/content/profile";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <Container>
      <PageHead glyph="历" title="Experience" sub="Where I'm building, working, and studying." />
      <TileGrid>
        {experienceTiles.map((t, i) => (
          <Tile key={t.slug} href={`/experience/${t.slug}`} {...t} priority={i < 2} />
        ))}
      </TileGrid>
    </Container>
  );
}
