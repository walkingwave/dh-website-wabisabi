import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHead } from "@/components/PageHead";
import { profile } from "@/content/profile";

export const metadata: Metadata = { title: "Contact" };

const rows = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "LinkedIn", value: "in/dylanho8", href: profile.linkedin },
  { label: "GitHub", value: "walkingwave", href: profile.github },
];

export default function ContactPage() {
  return (
    <Container>
      <PageHead glyph="谈" title="Contact" sub="Open to co-op and internship roles, and to talking about software, hardware, and music tech." />
      <ul className="border-t border-line">
        {rows.map((r) => (
          <li key={r.label} className="border-b border-line">
            <a
              href={r.href}
              target={r.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-8"
            >
              <span className="tracked text-[11px] text-faint">{r.label}</span>
              <span className="font-serif text-[clamp(28px,4.5vw,60px)] leading-none font-medium break-all transition-colors group-hover:text-vermilion">
                {r.value}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="tracked mt-8 text-[10px] text-faint">Toronto, Ontario</p>
    </Container>
  );
}
