import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHead } from "@/components/PageHead";
import { Tile, TileGrid } from "@/components/Tile";
import { formatDate } from "@/content/thoughts";
import { thoughts } from "@/content/thoughts";

export const metadata: Metadata = { title: "Thoughts" };

function cover(t: (typeof thoughts)[number]) {
  return t.image ?? t.images?.[t.images.length - 1];
}

export default function ThoughtsPage() {
  return (
    <Container>
      <PageHead glyph="味" title="Thoughts" sub="Mostly food. Honest ratings, Toronto prices." />
      <TileGrid>
        {thoughts.map((t, i) => (
          <Tile
            key={t.slug}
            href={`/thoughts/${t.slug}`}
            title={t.title}
            blurb={t.summary}
            image={cover(t)}
            tint="#f4f0e7"
            meta={formatDate(t.date)}
            priority={i < 2}
          />
        ))}
      </TileGrid>
    </Container>
  );
}
