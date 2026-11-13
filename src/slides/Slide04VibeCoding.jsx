import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowDown,
  Car,
  Play,
  Loader,
  TriangleAlert,
  Maximize,
  Minimize,
} from 'lucide-react'
import SlideHeader from '../components/SlideHeader'
import SectionLabel from '../components/SectionLabel'
import WorkflowDiagram from '../components/WorkflowDiagram'
import { generateApp } from '../lib/generateApp'

const DEFAULT_PROMPT = `Create a car rental website.
Users can log in, browse cars,
and book one for their dates.`

const EXAMPLES = [
  {
    id: 'school',
    label: 'School site',
    text: 'Create a website for a high school with a homepage, a list of courses, and a contact section.',
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    text: 'Create a menu website for an Italian restaurant with starters, mains and desserts, with prices.',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    text: 'Create a personal portfolio page for a photographer with a gallery grid and a contact form.',
  },
  {
    id: 'todo',
    label: 'To-do app',
    text: 'Create a simple to-do app where I can add tasks, tick them off and delete them.',
  },
]

const CARS = [
  { id: 'compact', name: 'Compact car', price: '€30 / day' },
  { id: 'suv', name: 'Family SUV', price: '€55 / day' },
  { id: 'electric', name: 'Electric car', price: '€70 / day' },
]

const FLOW = ['PROMPT', 'GENERATE', 'REVIEW', 'REFINE']

// Même hauteur pour les deux panneaux (réglable : changez 40vh / 300px)
const PANEL_H = 'h-[380px] lg:h-[40vh] lg:min-h-[300px]'

// Exemple affiché au départ (et de secours pour le prompt par défaut uniquement)
function RentalContent() {
  return (
    <div className="space-y-2 p-4" aria-hidden="true">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 font-display text-xl font-extrabold uppercase">
          <Car size={20} className="text-accent-text" /> RentGo
        </span>
        <span className="rounded border border-line px-3 py-1 text-xs">Log in</span>
      </div>
      {CARS.map(({ id, name, price }) => (
        <div
          key={id}
          className="flex items-center justify-between rounded-lg border border-line bg-bg px-3 py-2"
        >
          <div>
            <p className="font-semibold">{name}</p>
            <p className="font-mono text-xs text-ink-soft">{price}</p>
          </div>
          <span className="rounded bg-accent-deep px-3 py-1 text-xs font-semibold text-white">
            Book
          </span>
        </div>
      ))}
    </div>
  )
}

const describe = (failed) => failed.map((f) => `${f.name}: ${f.reason}`).join(' · ')

export default function Slide04VibeCoding() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT)
  const [state, setState] = useState({ status: 'idle', html: '', provider: '', failed: [] })
  const [isFull, setIsFull] = useState(false)
  const resultRef = useRef(null)

  const loading = state.status === 'loading'
  const canFull = typeof document !== 'undefined' && document.fullscreenEnabled

  // Synchronise l'état quand on entre/sort du plein écran (y compris avec Esc)
  useEffect(() => {
    const sync = () => setIsFull(document.fullscreenElement === resultRef.current)
    document.addEventListener('fullscreenchange', sync)
    return () => document.removeEventListener('fullscreenchange', sync)
  }, [])

  const toggleFull = () => {
    const el = resultRef.current
    if (!el) return
    if (document.fullscreenElement === el) {
      document.exitFullscreen()
    } else {
      el.requestFullscreen().catch(() => {})
    }
  }

  const generate = async () => {
    const text = prompt.trim()
    if (!text || loading) return
    setState({ status: 'loading', html: '', provider: '', failed: [] })
    try {
      const { html, provider, failed } = await generateApp(text)
      setState({ status: 'done', html, provider, failed })
    } catch (err) {
      const failed = err?.failed ?? []
      // La maquette de secours n'a de sens que pour le prompt par défaut
      setState({
        status: text === DEFAULT_PROMPT.trim() ? 'fallback' : 'error',
        html: '',
        provider: '',
        failed,
      })
    }
  }

  const badge = {
    idle: 'EXAMPLE',
    loading: 'GENERATING…',
    done: ``,
    fallback: 'BACKUP PREVIEW',
    error: 'ERROR',
  }[state.status]

  const note =
    state.status === 'loading'
      ? 'Generating…'
      : state.status === 'done' && state.failed.length
        ? `${describe(state.failed)} → answered by ${state.provider}`
        : state.status === 'fallback'
          ? `AI unavailable (${describe(state.failed)}). Showing the backup example.`
          : ''

  return (
    <div className="mx-auto flex min-h-full w-full max-w-[1500px] flex-col justify-center gap-6 px-8 pb-24 pt-8 md:px-16">
      <SlideHeader
        label="04 / THE NEW APPROACH"
        title="What is vibe coding?"
        intro="Describe any website in plain English. AI builds it."
      />

      <div className="grid items-start gap-5 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
        {/* 1. Prompt */}
        <div data-anim="fade">
          <SectionLabel as="p" className="mb-2">
            1 · YOU TYPE A PROMPT
          </SectionLabel>

          <div className={`panel flex flex-col overflow-hidden ${PANEL_H}`}>
            <textarea
              aria-label="Prompt for the AI"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault()
                  generate()
                }
              }}
              maxLength={500}
              className="min-h-0 flex-1 resize-none bg-bg p-4 font-mono text-sm leading-[1.6] text-ink"
            />

            <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
              {EXAMPLES.map(({ id, label, text }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPrompt(text)}
                  disabled={loading}
                  className="min-h-11 rounded-full border border-line bg-bg px-4 font-mono text-xs uppercase tracking-[0.08em] text-ink hover:bg-bg-alt disabled:opacity-60"
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 border-t border-line px-4 py-3">
              <button
                type="button"
                onClick={generate}
                disabled={loading || !prompt.trim()}
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg bg-accent-deep px-5 font-semibold text-white disabled:opacity-60"
              >
                {loading ? (
                  <Loader size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
                ) : (
                  <Play size={18} aria-hidden="true" />
                )}
                Generate
              </button>
              <p aria-live="polite" className="min-w-0 truncate font-mono text-xs text-ink-soft">
                {note}
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex justify-center self-center text-accent-text"
          data-anim="fade"
          aria-hidden="true"
        >
          <ArrowRight size={36} className="hidden lg:block" />
          <ArrowDown size={36} className="lg:hidden" />
        </div>

        {/* 2. Résultat */}
        <div>
          <SectionLabel as="p" className="mb-2" data-anim="fade">
            2 · AI GENERATES THE APP
          </SectionLabel>

          <div
            ref={resultRef}
            data-anim="panel"
            // En plein écran, on bloque les raccourcis de la présentation (flèches, espace...)
            onKeyDown={(e) => {
              if (isFull) e.stopPropagation()
            }}
            className={`panel flex flex-col overflow-hidden ${
              isFull ? 'h-full rounded-none border-0 bg-bg' : PANEL_H
            }`}
          >
            <div className="flex shrink-0 items-center gap-2 border-b border-line bg-bg px-4 py-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-line" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" aria-hidden="true" />
              {isFull && (
                <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                  Esc to exit
                </span>
              )}
              <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.08em] text-accent-text">
                {badge}
              </span>
              {canFull && (
                <button
                  type="button"
                  onClick={toggleFull}
                  aria-label={isFull ? 'Exit fullscreen preview' : 'Open preview in fullscreen'}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-bg text-ink hover:bg-bg-alt"
                >
                  {isFull ? (
                    <Minimize size={18} aria-hidden="true" />
                  ) : (
                    <Maximize size={18} aria-hidden="true" />
                  )}
                </button>
              )}
            </div>

            {/* Contenu : remplit toute la hauteur restante du panneau */}
            <div className="relative min-h-0 flex-1 bg-bg">
              {state.status === 'done' && (
                <iframe
                  title="Website generated by the AI"
                  sandbox="allow-scripts"
                  srcDoc={state.html}
                  className="absolute inset-0 h-full w-full bg-white"
                />
              )}

              {state.status === 'loading' && (
                <div className="absolute inset-0 flex items-center justify-center gap-3 text-ink-soft">
                  <Loader size={20} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
                  <span className="font-mono text-sm">AI is writing the site…</span>
                </div>
              )}

              {state.status === 'error' && (
                <div
                  role="alert"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-y-auto p-6 text-center"
                >
                  <TriangleAlert size={28} className="text-amber-700" aria-hidden="true" />
                  <p className="font-semibold">Could not generate this site.</p>
                  <p className="font-mono text-xs text-ink-soft">
                    {describe(state.failed) || 'Unknown error'}
                  </p>
                  <p className="text-sm text-ink-soft">
                    Check the API keys, the network, and restart the dev server.
                  </p>
                </div>
              )}

              {(state.status === 'idle' || state.status === 'fallback') && (
                <div className="absolute inset-0 overflow-y-auto">
                  <RentalContent />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <WorkflowDiagram steps={FLOW} ariaLabel="Vibe coding loop" />
    </div>
  )
}