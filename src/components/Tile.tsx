import Image from "next/image";
import Link from "next/link";
import { Children } from "react";
import { Reveal } from "./Reveal";

export type TileProps = {
  href: string;
  title: string;
  blurb: string;
  image?: { src: string; alt: string; fit?: "cover" | "contain"; position?: string };
  // a small mark shown at its own size in the middle of the tile
  icon?: { src: string; alt: string; size: number };
  // a brush character shown when there's no picture
  glyph?: string;
  tint?: string;
  priority?: boolean;
  meta?: string;
};

// A print in its mount: the picture on its own tint, the title set below it.
// On hover the picture leans in and a vermilion seal is stamped in the corner.
export function Tile({ href, title, blurb, image, icon, glyph, tint = "#f4f0e7", priority, meta }: TileProps) {
  const contain = image?.fit === "contain";

  return (
    <Link href={href} className="group block">
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-[6px] shadow-[0_1px_0_rgb(0_0_0/0.04),0_24px_50px_-28px_rgb(40_30_10/0.45)]"
        style={{ background: tint }}
      >
        {image && (
          <div
            className={`absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] ${
              contain ? "p-6 sm:p-10" : ""
            }`}
          >
            <div className="relative h-full w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={priority}
                sizes="(min-width: 640px) 600px, 100vw"
                className={contain ? "object-contain" : "object-cover"}
                style={{ objectPosition: image.position ?? "center" }}
              />
            </div>
          </div>
        )}
        {icon && (
          <div className="absolute inset-0 grid place-items-center transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
            <Image src={icon.src} alt={icon.alt} width={icon.size} height={icon.size} />
          </div>
        )}
        {!image && !icon && glyph && (
          <div className="absolute inset-0 grid place-items-center">
            <span
              className="font-brush text-[180px] leading-none text-[#ebe6db] transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08] sm:text-[240px]"
              style={{ filter: "url(#ink-bleed)" }}
              lang="zh-Hans"
              aria-hidden
            >
              {glyph}
            </span>
          </div>
        )}

        <span
          aria-hidden
          lang="zh-Hans"
          className="absolute right-4 bottom-4 grid h-12 w-12 scale-75 rotate-[-8deg] place-items-center rounded-[5px] bg-vermilion font-brush text-[30px] leading-none text-[#f4f0e7] opacity-0 shadow-[0_6px_16px_-6px_rgb(0_0_0/0.5)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-100 group-hover:opacity-100"
        >
          观
        </span>
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-[clamp(28px,2.8vw,38px)] leading-[1.05] font-medium transition-colors group-hover:text-vermilion">
          {title}
        </h3>
        {meta && <span className="shrink-0 font-serif text-[17px] text-faint italic">{meta}</span>}
      </div>
      <p className="mt-1.5 max-w-[46ch] text-[15px] leading-relaxed text-muted">{blurb}</p>
    </Link>
  );
}

// Two columns, the right one dropped a little so the grid reads like a
// hanging, not a spreadsheet.
export function TileGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:pb-24 sm:grid-cols-2 sm:gap-y-24 lg:gap-x-16 [&>*:nth-child(even)]:sm:translate-y-24">
      {Children.map(children, (child, i) => (
        <Reveal delay={(i % 2) * 0.12}>{child}</Reveal>
      ))}
    </div>
  );
}
