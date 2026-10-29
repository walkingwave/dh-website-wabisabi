// Inner page header: a huge brush character behind a serif title.
export function PageHead({ glyph, title, sub }: { glyph: string; title: string; sub?: string }) {
  return (
    <header className="relative pt-36 pb-16 sm:pt-44 sm:pb-24">
      <span
        className="brush pointer-events-none absolute top-16 -left-2 text-[200px] opacity-90 select-none sm:top-14 sm:text-[300px]"
        lang="zh-Hans"
        aria-hidden
      >
        {glyph}
      </span>
      <div className="relative pl-[150px] sm:pl-[230px]">
        <h1 className="font-serif text-[clamp(48px,8vw,120px)] leading-[0.88] font-medium tracking-[-0.015em]">{title}</h1>
        {sub && <p className="mt-5 max-w-[440px] text-[16px] leading-relaxed text-muted">{sub}</p>}
      </div>
    </header>
  );
}
