export default function WorkflowDiagram({
  steps,
  orientation = 'horizontal', // 'horizontal' | 'vertical'
  ariaLabel,
  className = '',
}) {
  const horizontal = orientation === 'horizontal'

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
              <span
                aria-hidden="true"
                data-anim={horizontal ? 'connector' : undefined}
                className={`absolute bottom-2 left-[17px] top-[44px] w-px bg-accent/50 ${
                  horizontal
                    ? 'md:bottom-auto md:left-[calc(50%_+_26px)] md:top-[18px] md:h-px md:w-[calc(100%_-_52px)]'
                    : ''
                }`}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}