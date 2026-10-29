"use client";

import { useEffect, useRef, useState } from "react";
import { suggestedQuestions } from "@/content/profile";
import { useSite } from "@/components/SiteProvider";
import { RichText } from "./RichText";

export function ChatBox() {
  const { messages, streaming, ask, stop, reset } = useSite();
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasChat = messages.length > 0;

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: streaming ? "auto" : "smooth" });
  }, [messages, streaming]);

  const submit = (q: string) => {
    if (!q.trim() || streaming) return;
    ask(q);
    setValue("");
  };

  return (
    <div className="w-full">
      {hasChat && (
        <div
          ref={scrollRef}
          className="mb-4 max-h-[52vh] space-y-5 overflow-y-auto rounded-[8px] bg-card p-6 shadow-[0_24px_50px_-30px_rgb(40_30_10/0.5)] ring-1 ring-line sm:p-8"
        >
          {messages.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="flex justify-end">
                <p className="max-w-[85%] border-r-2 border-vermilion pr-4 text-right font-serif text-[21px] leading-snug italic">{m.content}</p>
              </div>
            ) : (
              <div key={i} className="text-[15.5px] leading-[1.7] text-fg/85">
                {m.content ? <RichText text={m.content} /> : <span className="text-faint">…</span>}
              </div>
            ),
          )}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
        className="flex items-center gap-3 border-b-2 border-fg pb-3 transition-colors focus-within:border-vermilion"
      >
        <label htmlFor="ask" className="sr-only">
          Ask a question about Dylan
        </label>
        <input
          id="ask"
          value={value}
          maxLength={1200}
          onChange={(e) => setValue(e.target.value)}
          placeholder={hasChat ? "Ask a follow-up" : "Ask me anything"}
          autoComplete="off"
          className="h-14 min-w-0 flex-1 bg-transparent font-serif text-[clamp(22px,2.4vw,30px)] outline-none placeholder:text-faint"
        />
        {streaming ? (
          <button type="button" onClick={stop} aria-label="Stop" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-fg">
            <span className="h-3 w-3 rounded-[3px] bg-card" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!value.trim()}
            aria-label="Ask"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-vermilion text-card transition-all hover:scale-105 disabled:bg-fg/15 disabled:text-fg/40"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </form>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {hasChat ? (
          <button type="button" onClick={reset} className="tracked px-1 text-[10px] text-faint hover:text-vermilion">
            Clear
          </button>
        ) : (
          suggestedQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => submit(q)}
              className="rounded-full px-4 py-2 text-[13.5px] text-muted ring-1 ring-fg/20 transition-colors hover:bg-fg hover:text-card hover:ring-fg"
            >
              {q}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
