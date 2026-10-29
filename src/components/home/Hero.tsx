"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

// 行波 (xíngbō): a travelling wave. The two characters flank Hokusai's
// Great Wave and pull apart as you scroll.
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const leftX = useTransform(scrollYProgress, [0, 1], ["0vw", reduce ? "0vw" : "-14vw"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0vw", reduce ? "0vw" : "14vw"]);
  const waveScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.18]);
  const waveY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-6%"]);
  const fade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const brushIn = (delay: number) => ({
    initial: reduce ? false : { clipPath: "inset(0 0 100% 0)", opacity: 0.2 },
    animate: { clipPath: "inset(0 0 0% 0)", opacity: 1 },
    transition: { duration: 1.4, delay, ease },
  });

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden">
      {/* the two characters */}
      <motion.div style={{ x: leftX }} className="pointer-events-none absolute top-[13%] left-[1vw] sm:top-[12%] sm:left-[2vw]">
        <motion.span {...brushIn(0.15)} className="brush block text-[50vw] sm:text-[min(36vw,66vh)]" lang="zh-Hans">
          行
        </motion.span>
      </motion.div>
      <motion.div style={{ x: rightX }} className="pointer-events-none absolute top-[13%] right-[0vw] sm:top-[12%] sm:right-[1vw]">
        <motion.span {...brushIn(0.4)} className="brush block text-[50vw] sm:text-[min(36vw,66vh)]" lang="zh-Hans">
          波
        </motion.span>
      </motion.div>

      {/* the wave */}
      <motion.div
        style={{ scale: waveScale, y: waveY }}
        className="absolute bottom-0 left-1/2 w-[170vw] origin-bottom -translate-x-1/2 [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)] sm:w-[min(62vw,100vh)]"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.55, ease }}
        >
          <Image
            src="/art/great-wave-2400.webp"
            alt="Under the Wave off Kanagawa, Katsushika Hokusai, about 1830 to 1832"
            width={2400}
            height={1613}
            priority
            sizes="(min-width: 640px) 62vw, 170vw"
            className="h-auto w-full"
          />
        </motion.div>
      </motion.div>

      {/* name */}
      <motion.p
        style={{ opacity: fade }}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="tracked absolute top-[44%] left-[5vw] z-10 font-serif text-[clamp(28px,4.4vw,64px)] font-medium tracking-[0.3em] sm:top-[64%]"
      >
        Dylan
      </motion.p>
      <motion.p
        style={{ opacity: fade }}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.25 }}
        className="tracked absolute top-[44%] right-[6vw] z-10 font-serif text-[clamp(28px,4.4vw,64px)] font-medium tracking-[0.3em] sm:top-[64%]"
      >
        Ho
      </motion.p>

      {/* intro */}
      <motion.p
        style={{ opacity: fade }}
        className="absolute bottom-[7vh] left-[4vw] z-10 hidden max-w-[250px] font-serif text-[17px] leading-snug text-fg/80 lg:block"
      >
        Co-founder of Portfo. Computer engineering at the University of Toronto. Software for the web, and some of it
        makes noise.
      </motion.p>

      {/* ask */}
      <motion.div style={{ opacity: fade }} className="absolute top-[47%] right-[4.5vw] hidden sm:block">
        <Link
          href="#ask"
          className="group grid h-[104px] w-[104px] place-items-center rounded-full bg-card text-center shadow-[0_12px_30px_-10px_rgb(0_0_0/0.35)] ring-1 ring-black/5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110"
        >
          <span className="tracked text-[9px] leading-relaxed text-fg">
            Ask
            <br />
            about me
          </span>
        </Link>
      </motion.div>

      {/* colophon */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute right-[3.2vw] bottom-[6vh] hidden items-start gap-2 sm:flex"
        lang="zh-Hans"
      >
        <span className="vertical font-brush text-[20px] leading-none text-fg/75">多伦多</span>
        <span className="vertical font-brush text-[20px] leading-none text-fg/75">行波</span>
      </motion.div>

      <p className="tracked absolute bottom-[3vh] left-1/2 hidden -translate-x-1/2 text-[9px] text-fg/50 sm:block">
        Hokusai, The Great Wave, c. 1831
      </p>
    </section>
  );
}
