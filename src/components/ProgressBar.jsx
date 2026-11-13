export default function ProgressBar({ index, total }) {
  const pct = ((index + 1) / total) * 100
  return (
    <div
      className="fixed inset-x-0 top-0 z-40 h-1 bg-line"
      role="progressbar"
      aria-label="Presentation progress"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={index + 1}
    >
      <div
        className="h-full bg-accent transition-[width] duration-300 ease-out motion-reduce:transition-none"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}