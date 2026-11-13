export default function Slide({ index, total, active, ref, children }) {
  return (
    <section
      ref={ref}
      data-slide={index}
      aria-roledescription="slide"
      aria-label={`Slide ${index + 1} of ${total}`}
      aria-hidden={!active}
      inert={!active}
      className="invisible absolute inset-0 overflow-y-auto"
    >
      {children}
    </section>
  )
}