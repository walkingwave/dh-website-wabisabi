"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="flex h-24 items-center justify-between px-8 sm:px-12">
        <Link href="/" className="tracked text-[11px] text-fg/80 transition-colors hover:text-vermilion">
          [ Dylan Ho ]
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`tracked relative text-[11px] transition-colors ${active ? "text-vermilion" : "text-fg/70 hover:text-fg"}`}
              >
                {l.label}
                {active && <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-vermilion" />}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center md:hidden"
        >
          <span className="relative block h-3 w-7">
            <span className={`absolute left-0 h-px w-full bg-fg transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px w-full bg-fg transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav className="mx-6 rounded-[18px] bg-card/95 p-6 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.35)] backdrop-blur md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 font-serif text-[32px] leading-tight">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
