import { profile } from "@/content/profile";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="relative mt-40 overflow-hidden pt-28 pb-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <p className="tracked text-[11px] text-faint">Say hello</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 block font-serif text-[clamp(30px,5.4vw,78px)] leading-none font-medium break-all transition-colors hover:text-vermilion"
            >
              {profile.email}
            </a>
          </div>
          <span className="brush text-[120px] sm:text-[160px]" lang="zh-Hans" aria-hidden>
            谈
          </span>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6 text-[13px] text-muted">
          <span>© {new Date().getFullYear()} Dylan Ho, Toronto</span>
          <span className="flex gap-7">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="tracked text-[10px] hover:text-vermilion">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="tracked text-[10px] hover:text-vermilion">
              GitHub
            </a>
          </span>
        </div>
        <p className="mt-4 max-w-[640px] text-[11px] leading-relaxed text-faint">
          Artwork: Katsushika Hokusai, Under the Wave off Kanagawa, c. 1830–32. The Metropolitan Museum of Art, public domain.
        </p>
      </Container>
    </footer>
  );
}
