import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-5";
const MAX_TURNS = 16;
const MAX_CHARS = 1200;

// Best-effort per-IP limiter. It lives in one serverless instance's memory, so
// it's a speed bump for someone hammering the endpoint, not a hard quota. Put a
// spend limit on the API key in the Anthropic console for the real ceiling.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 25;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
}

const SYSTEM = buildSystemPrompt();

let client: Anthropic | null = null;
function getClient() {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  client ??= new Anthropic();
  return client;
}

function plain(message: string, status: number) {
  return new Response(message, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

function parseMessages(body: unknown): Anthropic.Beta.BetaMessageParam[] | null {
  if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) {
    return null;
  }
  const raw = (body as { messages: unknown[] }).messages.slice(-MAX_TURNS);
  const out: Anthropic.Beta.BetaMessageParam[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, role === "user" ? MAX_CHARS : 4000);
    if (!text) continue;
    out.push({ role, content: text });
  }
  // The conversation has to start with the visitor and end with their question.
  while (out.length && out[0].role !== "user") out.shift();
  if (!out.length || out[out.length - 1].role !== "user") return null;
  return out;
}

export async function POST(req: Request) {
  const anthropic = getClient();
  if (!anthropic) {
    return plain(
      "the assistant is napping right now (no api key configured). you can always email dylan at dylan.ho@mail.utoronto.ca.",
      503,
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return plain("that's a lot of questions. give it a few minutes, or just email him.", 429);
  }

  let messages: Anthropic.Beta.BetaMessageParam[] | null = null;
  try {
    messages = parseMessages(await req.json());
  } catch {
    messages = null;
  }
  if (!messages) return plain("bad request", 400);

  const stream = anthropic.beta.messages.stream(
    {
      model: MODEL,
      max_tokens: 2048,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low" },
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      messages,
    },
    { signal: req.signal },
  );

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(encoder.encode("\n\ni can't help with that one, but i'm happy to talk about dylan's work."));
        }
      } catch (err) {
        if (err instanceof Anthropic.APIUserAbortError) {
          // visitor navigated away or hit stop
        } else if (err instanceof Anthropic.RateLimitError || err instanceof Anthropic.InternalServerError) {
          controller.enqueue(encoder.encode("\n\n(the assistant is busy right now. try again in a moment.)"));
        } else {
          console.error("chat error", err);
          controller.enqueue(encoder.encode("\n\n(something went wrong on my end. try again, or email dylan directly.)"));
        }
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-accel-buffering": "no",
    },
  });
}
