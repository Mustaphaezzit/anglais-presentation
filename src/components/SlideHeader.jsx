import SectionLabel from './SectionLabel'

// level=1 uniquement pour la slide de couverture, <h2> partout ailleurs
export default function SlideHeader({
  label,
  title,
  intro,
  level = 2,
  size = 'lg', // 'lg' (slides 2-10) | 'xl' (couverture)
  className = '',
}) {
  const Heading = level === 1 ? 'h1' : 'h2'
  const sizeClass =
    size === 'xl'
      ? 'title-xl'
      : 'font-display text-[clamp(2.25rem,5vw,4.5rem)] font-extrabold uppercase leading-[0.95]'

  return (
    <header className={className}>
      <SectionLabel as="p" data-anim="fade">
        {label}
      </SectionLabel>
      <Heading className={`${sizeClass} mt-3`} data-anim="title">
        {title}
      </Heading>
      {intro && (
        <p
          className="mt-5 max-w-3xl text-lg text-ink-soft md:text-xl"
          data-anim="fade"
        >
          {intro}
        </p>
      )}
    </header>
  )
}