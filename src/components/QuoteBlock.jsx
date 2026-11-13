export default function QuoteBlock({
  children,
  caption,
  anim = 'fade',
  className = '',
}) {
  return (
    <figure
      className={`border-l-4 border-accent py-2 pl-6 md:pl-10 ${className}`.trim()}
      data-anim={anim || undefined}
    >
      <blockquote className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] italic leading-snug text-ink">
        {children}
      </blockquote>
      {caption && (
        <figcaption className="mt-4 font-mono text-xs uppercase tracking-[0.08em] text-ink-soft">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}