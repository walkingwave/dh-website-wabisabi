"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type ChatMessage = { role: "user" | "assistant"; content: string };

type SiteState = {
  messages: ChatMessage[];
  streaming: boolean;
  ask: (question: string) => void;
  stop: () => void;
  reset: () => void;
};

const SiteContext = createContext<SiteState | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}

// Holds the chat so a conversation survives moving between pages.
export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const ask = useCallback(async (question: string) => {
    const q = question.trim();
    if (!q) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const history: ChatMessage[] = [...messagesRef.current, { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setStreaming(true);

    const write = (text: string) =>
      setMessages((prev) => {
        const next = prev.slice();
        next[next.length - 1] = { role: "assistant", content: text };
        return next;
      });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history.filter((m) => m.content) }),
        signal: controller.signal,
      });
      if (!res.body) throw new Error("no body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        write(text);
      }
      if (!text.trim()) write("No answer came back. Try asking another way.");
    } catch (err) {
      if ((err as Error).name !== "AbortError") write("Couldn't reach the assistant. Try again, or email me.");
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
        setStreaming(false);
      }
    }
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStreaming(false);
  }, []);

  const reset = useCallback(() => {
    stop();
    setMessages([]);
  }, [stop]);

  const value = useMemo(() => ({ messages, streaming, ask, stop, reset }), [messages, streaming, ask, stop, reset]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
