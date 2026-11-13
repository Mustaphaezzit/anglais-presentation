import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function OverviewPanel({ open, slides, index, onSelect, onClose }) {
  const activeRef = useRef(null)

  useEffect(() => {
    if (open) activeRef.current?.focus()
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Slide overview"
        className="panel max-h-full w-full max-w-lg overflow-y-auto p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="label">Overview</h2>
          <button
            type="button"
            aria-label="Close overview"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-bg hover:bg-bg-alt"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <ol className="space-y-1">
          {slides.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                ref={i === index ? activeRef : null}
                onClick={() => onSelect(i)}
                aria-current={i === index ? 'true' : undefined}
                className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-bg ${
                  i === index ? 'bg-accent-tint' : ''
                }`}
              >
                <span className="font-mono text-xs text-accent-text">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm">{s.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}