import SectionLabel from './SectionLabel'

export default function InfoCard({
  tag,
  title,
  icon: Icon, // composant Lucide optionnel (jamais de risque signalé par la couleur seule)
  accent = false,
  anim = 'stagger',
  className = '',
  children,
}) {
  return (
    <article
      className={`panel p-5 md:p-6 ${accent ? 'bg-accent-tint' : ''} ${className}`.trim()}
      data-anim={anim || undefined}
    >
      {(tag || Icon) && (
        <div className="mb-3 flex items-center gap-2">
          {Icon && (
            <Icon size={18} className="text-accent-text" aria-hidden="true" />
          )}
          {tag && <SectionLabel>{tag}</SectionLabel>}
        </div>
      )}
      {title && (
        <h3 className="mb-2 font-display text-2xl font-extrabold uppercase leading-none">
          {title}
        </h3>
      )}
      <div className="text-ink-soft">{children}</div>
    </article>
  )
}