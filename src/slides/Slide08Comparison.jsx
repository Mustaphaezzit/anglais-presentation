import {
  Check,
  X,
  Eye,
  MousePointerClick,
  ArrowRight,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react'
import SlideHeader from '../components/SlideHeader'
import SectionLabel from '../components/SectionLabel'

// Pictogramme simple : tête + épaules. L'ingénieur a des lunettes et un badge </>
function PersonFigure({ variant }) {
  const engineer = variant === 'engineer'
  return (
    <svg
      viewBox="0 0 120 120"
      className={`h-24 w-24 shrink-0 ${engineer ? 'text-accent-text' : 'text-ink-soft'}`}
      role="img"
      aria-label={engineer ? 'Experienced developer' : 'Non-programmer'}
    >
      <circle cx="60" cy="38" r="20" fill="currentColor" />
      <path d="M18 116c0-28 18-44 42-44s42 16 42 44z" fill="currentColor" />
      {engineer && (
        <>
          <g stroke="var(--bg)" strokeWidth="3" fill="none">
            <circle cx="52" cy="38" r="6.5" />
            <circle cx="68" cy="38" r="6.5" />
            <path d="M58.5 38h3" />
          </g>
          <text
            x="60"
            y="102"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--bg)"
            fontFamily="ui-monospace, monospace"
          >
            {'</>'}
          </text>
        </>
      )}
    </svg>
  )
}

function TransferFlow() {
  const node = 'rounded border border-line bg-bg px-2 py-1 font-mono text-xs uppercase'
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Account A, then an error, then account B">
      <span className={node}>Account A</span>
      <ArrowRight size={14} className="text-ink-soft" aria-hidden="true" />
      <span className={`${node} !border-amber-700 text-amber-700`}>Error</span>
      <ArrowRight size={14} className="text-ink-soft" aria-hidden="true" />
      <span className={node}>Account B</span>
    </div>
  )
}

const COLUMNS = [
  {
    id: 'engineer',
    variant: 'engineer',
    good: true,
    label: 'EXPERIENCED DEVELOPER',
    caption: 'Checks what the AI produced',
    steps: [
      { icon: Check, text: 'Reads the code' },
      { icon: Check, text: 'Tests the failures' },
      { icon: Check, text: 'Secures the data' },
    ],
    bank: 'Rollback: the money returns to account A.',
    outcome: 'Reliable app',
  },
  {
    id: 'beginner',
    variant: 'beginner',
    good: false,
    label: 'NON-PROGRAMMER',
    caption: 'May trust what looks fine',
    steps: [
      { icon: MousePointerClick, text: 'Clicks the button' },
      { icon: Eye, text: 'Trusts what it sees' },
      { icon: X, text: 'May miss hidden flaws' },
    ],
    bank: 'The money may be lost: account B never receives it.',
    outcome: 'Hidden problems',
  },
]

function Column({ variant, good, label, caption, steps, bank, outcome }) {
  const accent = good ? 'text-accent-text' : 'text-amber-700'
  const OutcomeIcon = good ? ShieldCheck : TriangleAlert
  return (
    <div data-anim="stagger" className={`panel p-5 md:p-6 ${good ? 'border-accent' : ''}`}>
      <div className="flex items-center gap-4">
        <PersonFigure variant={variant} />
        <div>
          <SectionLabel as="p" className={accent}>
            {label}
          </SectionLabel>
          <p className="mt-1 text-lg text-ink-soft">{caption}</p>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {steps.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 text-lg">
            <Icon size={18} className={`shrink-0 ${accent}`} aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>

      <div className="mt-4 border-t border-line pt-4">
        <SectionLabel as="p" className="mb-2">
          BANK TRANSFER FAILS
        </SectionLabel>
        <TransferFlow />
        <p className="mt-2 text-ink">{bank}</p>
      </div>

      <p
        className={`mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-[0.08em] ${
          good ? 'border-accent bg-accent-tint text-accent-text' : 'border-amber-700 text-amber-700'
        }`}
      >
        <OutcomeIcon size={14} aria-hidden="true" />
        {outcome}
      </p>
    </div>
  )
}

export default function Slide08Comparison() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-[1500px] flex-col justify-center gap-6 px-8 pb-24 pt-8 md:px-16">
      <SlideHeader
        label="08 / TECHNICAL KNOWLEDGE"
        title="The same AI. Different results."
        intro="Same tool, same app, different checks."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {COLUMNS.map(({ id, ...column }) => (
          <Column key={id} {...column} />
        ))}
      </div>
    </div>
  )
}