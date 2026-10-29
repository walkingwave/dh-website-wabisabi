import { profile, experience, skills, interests, nowBuilding } from "@/content/profile";
import { projects } from "@/content/projects";
import { thoughts } from "@/content/thoughts";

// Builds the system prompt for the chat assistant out of the same content the
// site renders. It is deterministic (no dates, no randomness) so the prompt
// cache hits on every request.

function section(title: string, body: string) {
  return `<${title}>\n${body.trim()}\n</${title}>`;
}

function projectText() {
  return projects
    .map((p) => {
      const lines = [
        `## ${p.title} (slug: ${p.slug})`,
        `period: ${p.period}`,
        p.tags.length ? `tags: ${p.tags.join(", ")}` : "",
        p.techStack.length ? `stack: ${p.techStack.join(", ")}` : "",
        p.metrics.length ? `numbers: ${p.metrics.map((m) => `${m.label} ${m.value}`).join("; ")}` : "",
        p.link ? `link: ${p.link.href}` : "",
        `overview: ${p.overview}`,
        p.highlights.length ? `highlights:\n${p.highlights.map((h) => `- ${h}`).join("\n")}` : "",
        p.writeup?.length ? `dylan's writeup:\n${p.writeup.join("\n\n")}` : "",
      ];
      return lines.filter(Boolean).join("\n");
    })
    .join("\n\n");
}

function thoughtText() {
  return thoughts
    .map((t) =>
      [
        `## ${t.title} (${t.date})`,
        t.order ? `order: ${t.order}` : "",
        t.rating ? `rating: ${t.rating}` : "",
        t.body.join("\n"),
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");
}

export function buildSystemPrompt() {
  const about = [
    `name: ${profile.name}`,
    `based in: ${profile.location}`,
    `school: ${profile.education.program}, ${profile.education.school}`,
    `headline: ${profile.headline}`,
    `intro (his words): ${profile.intro}`,
    `how he works (his words): ${profile.philosophy}`,
    `looking for: ${profile.lookingFor}`,
    `co-founder of ${nowBuilding.name} (${nowBuilding.href}), his main focus right now, "${nowBuilding.tagline}" ${nowBuilding.pitch} status: ${nowBuilding.status}. ${nowBuilding.pillars
      .map((p) => `${p.title}: ${p.body}`)
      .join(" ")} built with ${nowBuilding.stack.join(", ")}.`,
    `interests: ${interests.join(", ")}`,
    `contact: email ${profile.email}, linkedin ${profile.linkedin}, github ${profile.github}`,
  ].join("\n");

  const work = experience
    .map(
      (e) =>
        `## ${e.role}, ${e.company} (${e.type}, ${e.period}, ${e.location})\n${e.summary}\n${e.highlights
          .map((h) => `- ${h}`)
          .join("\n")}`,
    )
    .join("\n\n");

  const skillText = skills.map((s) => `${s.label}: ${s.items.join(", ")}`).join("\n");

  return `You are the assistant on Dylan Ho's portfolio website. Visitors (often recruiters, engineers, and friends) ask you questions about Dylan, and you answer using only the information below.

How to answer:
- Talk about Dylan in the third person ("he", "dylan"). You are not Dylan. If someone asks who you are, you're a small assistant that has read everything on this site.
- Keep it short: usually one to three sentences. Use a short list only when someone asks for several things at once. No headings.
- Be plain and direct. Normal capitalization, no filler, no hype words, no exclamation marks, no closing offers like "let me know if you want more". Stay precise with numbers and technical details. Never use em dashes; use commas, periods, or parentheses instead.
- When you mention one of his projects, link it with the exact token [[slug]] (for example [[paddlelab-xr]]). The site turns that into a link to the project page. Only use slugs that appear below.
- Only state facts that appear below. If something isn't covered (grades, graduation year, salary expectations, availability dates, opinions he hasn't shared), say you don't know and suggest emailing him at ${profile.email}. Don't guess, and don't invent projects, employers, or numbers.
- Stay on topic. For requests unrelated to Dylan (homework, code, general trivia), steer back politely in one line. A little humor is welcome; mean or inappropriate content is not.
- Dylan's focus is software. When someone asks broadly (what he does, his best work, what he's building), lead with Portfo (the company he co-founded, which is experience, not a project, so never link it with [[...]]) and then his software projects (PaddleLab XR, Unstable DAW, InternOutsider, the articulation classifier). His embedded and hardware projects are real and worth mentioning when relevant, but they're the background, not the headline. Keep his Wolf Advanced Technology co-op brief unless someone asks about it specifically.
- The site has four other pages: projects, experience, thoughts (food reviews and posts), and contact. Point people to them by name when it helps (for example "the contact page has his email and linkedin").
- Answer as fast as you can; this is a live chat, so begin your visible answer immediately.

${section("about", about)}

${section("experience", work)}

${section("skills", skillText)}

${section("projects", projectText())}

${section("food_reviews_and_thoughts", thoughtText())}`;
}
