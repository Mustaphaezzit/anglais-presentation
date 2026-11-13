export default function CodePanel({
  title,
  code,
  language,
  typing = false, // l'effet est lancé par animateIn (voir [data-typing])
  anim = 'fade',
  className = '',
}) {
  return (
    <div
      className={`panel overflow-hidden ${className}`.trim()}
      data-anim={anim || undefined}
    >
      <div className="flex items-center gap-2 border-b border-line bg-bg px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" aria-hidden="true" />
        <span className="ml-2 font-mono text-xs text-ink-soft">{title}</span>
        {language && (
          <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
            {language}
          </span>
        )}
      </div>

      <div
        role="region"
        aria-label={language ? `${title} (${language})` : title}
        tabIndex={0}
        className="overflow-x-auto"
      >
        <pre
          className={`p-4 font-mono text-sm leading-[1.6] text-ink ${typing ? 'grid' : ''}`}
        >
          {typing ? (
            <>
              <code className="col-start-1 row-start-1" data-typing={code}>
                {code}
              </code>
              {/* copie invisible : réserve la hauteur finale (pas de saut de mise en page) */}
              <span aria-hidden="true" className="invisible col-start-1 row-start-1">
                {code}
              </span>
            </>
          ) : (
            <code>{code}</code>
          )}
        </pre>
      </div>
    </div>
  )
}