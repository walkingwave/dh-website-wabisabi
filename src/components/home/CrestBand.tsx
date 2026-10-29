"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// A close crop of Hokusai's crest, full width, drifting slower than the page.
export function CrestBand({ text }: { text: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-5%", "5%"]);
  const glyphY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["30%", "-30%"]);

  return (
    <section ref={ref} className="relative h-[88vh] min-h-[560px] overflow-hidden">
      <motion.div style={{ y }} className="absolute -inset-y-[6%] inset-x-0">
        <Image
          src="/art/great-wave-crest.webp"
          alt="Detail of the crest from Hokusai's Great Wave"
          fill
          sizes="100vw"
          className="object-cover object-left"
        />
      </motion.div>

      <div className="absolute inset-y-0 right-0 flex w-full items-center justify-end bg-gradient-to-l from-[#ebe6db] from-45% via-[#ebe6db]/80 via-65% to-transparent px-8 sm:w-[66%] sm:px-16">
        <div className="relative max-w-[440px]">
          <motion.span
            style={{ y: glyphY }}
            className="brush absolute -top-44 right-0 text-[170px] sm:-top-60 sm:-right-6 sm:text-[230px]"
            lang="zh-Hans"
            aria-hidden
          >
            道
          </motion.span>
          <p className="relative font-serif text-[clamp(36px,4.6vw,68px)] leading-[0.98] font-medium">
            Scope it. Build it. Prove it works.
          </p>
          <p className="relative mt-6 text-[16px] leading-relaxed text-muted">{text}</p>
        </div>
      </div>
    </section>
  );
}
