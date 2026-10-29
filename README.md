# dh-website-wabisabi

Dylan Ho's portfolio. Next.js 16, React 19, Tailwind v4, and an "ask me anything" assistant on the home page, powered by Claude.

## Run it

```bash
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY for the chat
npm run dev
```

Open http://localhost:3000. Without an API key the site still works fully; the chat replies that it's napping and points people to your email.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run images` | Regenerate image dimensions after adding images |

## Editing content

Everything lives in `src/content/`. The page and the chat assistant both read from it, so an edit shows up in both on the next deploy.

- `profile.ts`: intro, experience (Portfo, Wolf), skills, interests, the Portfo section copy, and the suggested chat questions.
- `projects.ts`: every project: cover image, write-up paragraphs, figures with captions, metrics, links. the software/embedded split and order are set in `src/components/work/ProjectList.tsx`.
- `thoughts.ts`: food reviews, carried over from the old site (the assistant knows these too).

Images go in `public/work` (projects) or `public/life` (photos). After adding any, run `npm run images` so figures render at their real aspect ratio.

The order of the project list is set at the top of `src/components/work/ProjectList.tsx`.

## The chat

`src/app/api/chat/route.ts` streams replies from the Claude API. The system prompt is built in `src/lib/knowledge.ts` from the content files, so the assistant only knows what's on the site. It talks about you in the third person, stays on topic, says "i don't know, email him" instead of guessing, and can link projects with `[[slug]]` tokens that the UI turns into buttons that open the project.

- Model: `claude-opus-5` by default at low effort (fast, chatty answers). Set `ANTHROPIC_MODEL` to use something else, e.g. `claude-sonnet-5` to cut cost.
- The system prompt is cached, so repeat visitors are cheap.
- There's a per-IP speed bump (25 requests / 10 min per server instance). It's not a quota: **set a monthly spend limit on the key in the Anthropic Console.**

## Deploy (Vercel)

1. Import the repo in Vercel. It detects Next.js on its own.
2. Add `ANTHROPIC_API_KEY` under Project → Settings → Environment Variables.
3. Deploy.

## Design

Wabi-sabi meets ukiyo-e. Rice paper inside an olive mount, huge vermilion brush calligraphy, and real public-domain artwork.

- Hero: 行波 (xíngbō, "travelling wave") in Zhi Mang Xing brush type flanking a cutout of Hokusai's Great Wave. The characters pull apart and the wave swells as you scroll. `src/components/home/Hero.tsx`.
- Crest band: a full-bleed detail of the Great Wave with parallax. `src/components/home/CrestBand.tsx`.
- Type: Cormorant Garamond (display), Instrument Sans (body), Zhi Mang Xing (Chinese brush). All self-hosted via fontsource.
- Ink edges on the brush characters come from the `ink-bleed` SVG filter in `src/components/InkDefs.tsx`.
- Tiles are prints in a mount; hover stamps a 观 seal. `src/components/Tile.tsx`.
- Artwork lives in `public/art`. The Great Wave is from The Met's Open Access collection (public domain, CC0).

## Layout

Pages: `/` (intro, chat, project tiles), `/projects` and `/projects/[slug]`, `/experience` and `/experience/[slug]`, `/thoughts` and `/thoughts/[slug]`, `/contact`.

```
src/
  app/            layout, each page, /api/chat
  components/     Nav, Footer, Tile, ProjectTile, Figure, SiteProvider (chat state)
    chat/         ChatBox + the reply formatter
  content/        profile, projects, order, thoughts, image sizes
  lib/            system prompt builder
```
