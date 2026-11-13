import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Slide from './Slide'
import ProgressBar from './ProgressBar'
import NavigationControls from './NavigationControls'
import OverviewPanel from './OverviewPanel'
import { animateIn, animateOut } from '../animations/slideAnimations'

import Slide01Introduction from '../slides/Slide01Introduction'
import Slide02AI from '../slides/Slide02AI'
import Slide03WebDevelopment from '../slides/Slide03WebDevelopment'
import Slide04VibeCoding from '../slides/Slide04VibeCoding'
import Slide05Workflow from '../slides/Slide05Workflow'
import Slide06Advantages from '../slides/Slide06Advantages'
import Slide07Risks from '../slides/Slide07Risks'
import Slide08Comparison from '../slides/Slide08Comparison'
import Slide09BestPractices from '../slides/Slide09BestPractices'
import Slide10References from '../slides/Slide10References'

const slides = [
  { id: 'intro', title: 'The Future of Web Development', Component: Slide01Introduction },
  { id: 'ai', title: 'What is AI in software development?', Component: Slide02AI },
  { id: 'stack', title: 'AI across the development stack', Component: Slide03WebDevelopment },
  { id: 'vibe', title: 'What is vibe coding?', Component: Slide04VibeCoding },
  { id: 'workflow', title: 'From prompt to production', Component: Slide05Workflow },
  { id: 'advantages', title: 'Why are developers adopting it?', Component: Slide06Advantages },
  { id: 'risks', title: 'When generated code becomes a problem', Component: Slide07Risks },
  { id: 'comparison', title: 'The same AI. Different results.', Component: Slide08Comparison },
  { id: 'practices', title: 'Use AI. Keep control.', Component: Slide09BestPractices },
  { id: 'references', title: 'Sources & further reading', Component: Slide10References },
]
const total = slides.length

export default function PresentationShell() {
  const [index, setIndex] = useState(0)
  const [overviewOpen, setOverviewOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const slideRefs = useRef([])
  const ctxRef = useRef(null) // gsap.context : nettoyage StrictMode-safe
  const tlRef = useRef(null) // timeline en cours
  const indexRef = useRef(0) // dernière destination acceptée
  const shownRef = useRef(0) // slide actuellement affichée à l'écran
  const overviewRef = useRef(false)
  const isAnimating = useRef(false)
  const pendingRef = useRef(null) // seule la dernière demande est gardée

  const goTo = useCallback(function go(next) {
    const target = Math.max(0, Math.min(total - 1, next))

    if (isAnimating.current) {
      pendingRef.current = target
      return
    }

    const from = shownRef.current
    if (target === from) return

    isAnimating.current = true
    indexRef.current = target
    setIndex(target) // compteur + progression + aria mis à jour tout de suite

    const direction = target > from ? 1 : -1

    const run = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          shownRef.current = target
          isAnimating.current = false
          tlRef.current = null
          const p = pendingRef.current
          pendingRef.current = null
          if (p !== null) go(p)
        },
      })
      tl.add(animateOut(slideRefs.current[from], { direction }))
      tl.add(animateIn(slideRefs.current[target], { direction }))
      tlRef.current = tl
    }

    // run() dans le contexte GSAP pour que tout soit nettoyé au démontage
    if (ctxRef.current) ctxRef.current.add(run)
    else run()
  }, [])

  // Appuis rapides : on part de la destination en attente, donc ils s'accumulent
  const goNext = useCallback(
    () => goTo((pendingRef.current ?? indexRef.current) + 1),
    [goTo],
  )
  const goPrev = useCallback(
    () => goTo((pendingRef.current ?? indexRef.current) - 1),
    [goTo],
  )

  // Animation d'entrée de la première slide
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {})
    ctxRef.current = ctx

    ctx.add(() => {
      isAnimating.current = true
      const tl = animateIn(slideRefs.current[shownRef.current], { direction: 1 })
      tl.eventCallback('onComplete', () => {
        isAnimating.current = false
        tlRef.current = null
        const p = pendingRef.current
        pendingRef.current = null
        if (p !== null) goTo(p)
      })
      tlRef.current = tl
    })

    return () => {
      tlRef.current?.kill()
      tlRef.current = null
      isAnimating.current = false
      pendingRef.current = null
      ctx.revert()
      ctxRef.current = null
    }
  }, [goTo])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenEnabled) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen().catch(() => {})
    }
  }, [])

  useEffect(() => {
    overviewRef.current = overviewOpen
  }, [overviewOpen])

  useEffect(() => {
    const sync = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', sync)
    return () => document.removeEventListener('fullscreenchange', sync)
  }, [])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return

      const t = e.target
      if (
        t instanceof HTMLElement &&
        (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName))
      ) {
        return
      }

      if (e.key === 'Escape') {
        if (overviewRef.current) {
          setOverviewOpen(false)
        } else if (document.fullscreenElement) {
          document.exitFullscreen()
        }
        return
      }

      if (overviewRef.current) return

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          goNext()
          break
        case ' ':
        case 'Spacebar':
          if (t instanceof HTMLElement && t.closest('button, a')) return
          e.preventDefault()
          goNext()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          goPrev()
          break
        case 'Home':
          e.preventDefault()
          goTo(0)
          break
        case 'End':
          e.preventDefault()
          goTo(total - 1)
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goNext, goPrev, goTo, toggleFullscreen])

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-bg text-ink">
      <ProgressBar index={index} total={total} />

      {slides.map(({ id, Component }, i) => (
        <Slide
          key={id}
          index={i}
          total={total}
          active={i === index}
          ref={(el) => {
            slideRefs.current[i] = el
          }}
        >
          <Component />
        </Slide>
      ))}

      <NavigationControls
        index={index}
        total={total}
        isFullscreen={isFullscreen}
        overviewOpen={overviewOpen}
        onPrev={goPrev}
        onNext={goNext}
        onToggleFullscreen={toggleFullscreen}
        onToggleOverview={() => setOverviewOpen((v) => !v)}
      />

      <OverviewPanel
        open={overviewOpen}
        slides={slides}
        index={index}
        onSelect={(i) => {
          goTo(i)
          setOverviewOpen(false)
        }}
        onClose={() => setOverviewOpen(false)}
      />
    </main>
  )
}