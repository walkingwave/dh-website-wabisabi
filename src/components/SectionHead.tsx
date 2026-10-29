// A big brush character with an English title set beside it.
export function SectionHead({
  glyph,
  title,
  sub,
  action,
}: {
  glyph: string;
  title: string;
  sub?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-14 flex flex-wrap items-end justify-between gap-6 sm:mb-20">
      <div className="flex items-end gap-5 sm:gap-8">
        <span className="brush -mb-2 text-[110px] sm:text-[170px]" lang="zh-Hans" aria-hidden>
          {glyph}
        </span>
        <div className="pb-2">
          <h2 className="font-serif text-[clamp(40px,6vw,84px)] leading-[0.9] font-medium tracking-[-0.01em]">{title}</h2>
          {sub && <p className="mt-3 max-w-[420px] text-[15px] leading-relaxed text-muted">{sub}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}
