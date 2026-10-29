import Image from "next/image";
import { imageSizes } from "@/content/imageSizes";

export function Figure({
  src,
  alt,
  caption,
  priority,
  tint,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  tint?: string;
}) {
  const size = imageSizes[src] ?? { w: 1600, h: 1000 };
  return (
    <figure>
      <div className="overflow-hidden rounded-[6px] bg-tile shadow-[0_24px_50px_-30px_rgb(40_30_10/0.5)]" style={tint ? { background: tint } : undefined}>
        <Image
          src={src}
          alt={alt}
          width={size.w}
          height={size.h}
          priority={priority}
          sizes="(min-width: 1180px) 1120px, 100vw"
          className="mx-auto h-auto max-h-[80vh] w-auto max-w-full"
        />
      </div>
      {caption && <figcaption className="mt-3 max-w-[640px] font-serif text-[16px] leading-snug text-muted italic">{caption}</figcaption>}
    </figure>
  );
}
