export default function PlaceholderSlide({ label, title, level = 2 }) {
  const Heading = level === 1 ? 'h1' : 'h2'
  return (
    <div className="flex h-full flex-col justify-center px-8 pb-24 md:px-16">
      <p className="label" data-anim="fade">{label}</p>
      <Heading className="title-xl" data-anim="title">{title}</Heading>
    </div>
  )
}