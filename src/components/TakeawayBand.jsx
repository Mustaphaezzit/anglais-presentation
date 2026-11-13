import SectionLabel from './SectionLabel'

export default function TakeawayBand({
  children,
  label = 'KEY TAKEAWAY',
  anim = 'panel',
  className = '',
}) {
  return (
    <aside
      aria-label={label}
      className={`panel border-accent/30 bg-accent-tint p-5 md:p-6 ${className}`.trim()}
      data-anim={anim || undefined}
    >
      <SectionLabel as="p" className="mb-2">
        {label}
      </SectionLabel>
      <div className="text-lg font-medium text-ink md:text-xl">{children}</div>
    </aside>
  )
}