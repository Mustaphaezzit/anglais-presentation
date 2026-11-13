const pad = (n) => String(n).padStart(2, '0')

export default function SlideCounter({ index, total }) {
  return (
    <p
      className="font-mono text-sm tabular-nums text-ink-soft"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="sr-only">Slide </span>
      {pad(index + 1)} / {pad(total)}
    </p>
  )
}