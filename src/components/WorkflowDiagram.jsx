export default function WorkflowDiagram({
  steps,
  orientation = 'horizontal', // 'horizontal' | 'vertical'
  ariaLabel,
  className = '',
}) {
  const horizontal = orientation === 'horizontal'

  // Trait : vertical sur mobile, horizontal à partir de md (si orientation horizontale)
  const connectorCls = horizontal
    ? 'absolute bottom-2 left-[17px] top-[44px] w-px md:bottom-auto md:left-[calc(50%_+_26px)] md:top-[18px] md:h-px md:w-[calc(100%_-_52px)]'
    : 'absolute bottom-2 left-[17px] top-[44px] w-px'

  // Pointe de flèche à l'extrémité du trait
  const headCls = horizontal
    ? 'absolute -bottom-0.5 left-1/2 -translate-x-1/2 rotate-90 md:bottom-auto md:left-auto md:right-[-2px] md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:rotate-0'
    : 'absolute -bottom-0.5 left-1/2 -translate-x-1/2 rotate-90'

  // Lumière qui glisse le long du trait (cachée tant que GSAP ne l'active pas)
  const pulseCls = horizontal
    ? 'absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0 md:left-0 md:top-1/2'
    : 'absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0'

  return (
    <ol
      aria-label={ariaLabel}
      className={`flex flex-col ${horizontal ? 'md:flex-row' : ''} ${className}`.trim()}
    >
      {steps.map((label, i) => {
        const last = i === steps.length - 1
        return (
          <li
            key={label}
            data-anim="stagger"
            className={`relative flex items-start gap-3 ${last ? '' : 'pb-10'} ${
              horizontal
                ? 'md:flex-1 md:flex-col md:items-center md:gap-2 md:pb-0 md:text-center'
                : ''
            }`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent bg-accent-tint font-mono text-sm font-semibold text-accent-text">
              {i + 1}
            </span>
            <span className="pt-2 font-mono text-xs uppercase tracking-[0.08em] md:pt-0">
              {label}
            </span>

            {!last && (
              <span aria-hidden="true" data-anim="connector" className={connectorCls}>
                <span data-line className="absolute inset-0 bg-accent/50" />

                <span className={headCls}>
                  <svg
                    data-head
                    viewBox="0 0 10 10"
                    width="10"
                    height="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="block text-accent"
                  >
                    <path d="M2.5 1.5 7 5l-4.5 3.5" />
                  </svg>
                </span>

                <span data-pulse className={pulseCls} />
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}