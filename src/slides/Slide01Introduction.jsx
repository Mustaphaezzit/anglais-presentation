import SectionLabel from '../components/SectionLabel'
import emsiLogo from "../assets/image.png"

const TITLE_LINES = ['The future of', 'Web development']
const AGENDA = ['AI basics', 'Vibe coding', 'Risks', 'Why skills matter']
const PRESENTERS = ['EZZIT MUSTAPHA', 'MOUSTATAA TAHA YASSINE']

function CodeGridMotif() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-y-0 right-0 h-full w-full text-accent-text opacity-[0.08] lg:w-3/5"
      viewBox="0 0 600 600"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
    >
      <defs>
        <pattern id="cover-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="600" height="600" fill="url(#cover-grid)" />
      <g stroke="currentColor" strokeWidth="8" strokeLinecap="round">
        <path d="M300 144h120" />
        <path d="M324 192h200" />
        <path d="M324 240h96" />
        <path d="M348 288h160" />
        <path d="M324 336h72" />
        <path d="M300 384h140" />
      </g>
    </svg>
  )
}

export default function Slide01Introduction() {
  return (
    <div className="relative flex min-h-full items-center overflow-hidden">
      <CodeGridMotif />

      <div className="relative mx-auto w-full max-w-[1500px] px-8 pb-24 pt-12 md:px-16">
<img
  src={emsiLogo}
  alt="EMSI"
  data-anim="fade"
  className="mb-6 block h-auto w-56 max-w-full object-contain md:w-72 lg:w-96"
/>

        <SectionLabel as="p" data-anim="fade">
          01 / INTRODUCTION
        </SectionLabel>

        <h1 className="mt-4 font-display text-[clamp(2.75rem,6.5vw,7rem)] font-extrabold uppercase leading-[0.9]">
          {TITLE_LINES.map((line) => (
            <span key={line} className="block" data-anim="title">
              {line}
            </span>
          ))}
          <span className="block text-accent-text" data-anim="title">
            AI &amp; Vibe Coding
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-xl text-ink-soft md:text-2xl" data-anim="fade">
          Can anyone build software now?
        </p>

        <ol className="mt-8 flex flex-wrap gap-2">
          {AGENDA.map((item, i) => (
            <li
              key={item}
              data-anim="stagger"
              className="rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-[0.08em] text-ink-soft"
            >
              <span className="text-accent-text">{String(i + 1).padStart(2, '0')}</span> {item}
            </li>
          ))}
        </ol>

        <p
          className="mt-8 font-mono text-xs uppercase tracking-[0.08em] text-ink-soft"
          data-anim="fade"
        >
          Presented by{' '}
          <span className="font-semibold text-accent-text">{PRESENTERS[0]}</span>
          {' '}&amp;{' '}
          <span className="font-semibold text-accent-text">{PRESENTERS[1]}</span>
        </p>
      </div>
    </div>
  )
}