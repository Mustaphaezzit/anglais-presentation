import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  LayoutGrid,
} from 'lucide-react'
import SlideCounter from './SlideCounter'

const btn =
  'inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-bg text-ink hover:bg-bg-alt disabled:pointer-events-none disabled:opacity-40'

export default function NavigationControls({
  index,
  total,
  isFullscreen,
  overviewOpen,
  onPrev,
  onNext,
  onToggleFullscreen,
  onToggleOverview,
}) {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
      <SlideCounter index={index} total={total} />
      <button
        type="button"
        className={btn}
        aria-label="Previous slide"
        onClick={onPrev}
        disabled={index === 0}
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        className={btn}
        aria-label="Next slide"
        onClick={onNext}
        disabled={index === total - 1}
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        className={btn}
        aria-label="Open slide overview"
        aria-expanded={overviewOpen}
        onClick={onToggleOverview}
      >
        <LayoutGrid size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        className={btn}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        onClick={onToggleFullscreen}
      >
        {isFullscreen ? (
          <Minimize size={20} aria-hidden="true" />
        ) : (
          <Maximize size={20} aria-hidden="true" />
        )}
      </button>
    </div>
  )
}