"use client";

import Link from "next/link";
import { Fragment } from "react";
import { projects } from "@/content/projects";

const titles = new Map(projects.map((p) => [p.slug, p.title]));

// A deliberately tiny formatter for the assistant's replies: paragraphs,
// "- " lists, **bold**, [text](url), bare urls, and [[slug]] project links.
const INLINE = /(\[\[[a-z0-9-]+\]\]|\*\*[^*]+\*\*|\[[^\]]+\]\((?:https?:\/\/|mailto:)[^)\s]+\)|https?:\/\/[^\s)]*[^\s).,!?]|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

function Inline({ text }: { text: string }) {
  const parts = text.split(INLINE);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        const slug = part.match(/^\[\[([a-z0-9-]+)\]\]$/)?.[1];
        if (slug) {
          const title = titles.get(slug);
          if (!title) return <Fragment key={i}>{slug.replace(/-/g, " ")}</Fragment>;
          return (
            <Link key={i} href={`/projects/${slug}`} className="text-fg underline decoration-faint underline-offset-[3px] hover:decoration-fg">
              {title}
            </Link>
          );
        }
        if (part.startsWith("**")) return <strong key={i} className="font-medium text-fg">{part.slice(2, -2)}</strong>;
        const md = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (md) return <A key={i} href={md[2]}>{md[1]}</A>;
        if (/^https?:\/\//.test(part)) return <A key={i} href={part}>{part.replace(/^https?:\/\/(www\.)?/, "")}</A>;
        if (/^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/.test(part)) return <A key={i} href={`mailto:${part}`}>{part}</A>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="text-fg underline decoration-faint underline-offset-[3px] hover:decoration-fg"
    >
      {children}
    </a>
  );
}

export function RichText({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split("\n").filter((l) => l.trim());
        if (lines.length && lines.every((l) => /^\s*([-*•]|\d+\.)\s+/.test(l))) {
          return (
            <ul key={i} className="my-2 space-y-1.5">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-2.5">
                  <span className="shrink-0 text-faint">–</span>
                  <span>
                    <Inline text={l.replace(/^\s*([-*•]|\d+\.)\s+/, "")} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="[&:not(:first-child)]:mt-3">
            {lines.map((l, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                <Inline text={l} />
              </Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
}
