import { Check } from 'lucide-react'
import SlideHeader from '../components/SlideHeader'

const PRACTICES = [
  { id: 'review', title: 'Review', text: 'Read all generated code' },
  { id: 'test', title: 'Test', text: 'Try edge cases and failures' },
  { id: 'secure', title: 'Secure', text: 'Validate input, protect secrets' },
  { id: 'learn', title: 'Keep learning', text: 'The fundamentals still matter' },
]

export default function Slide09BestPractices() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-[1500px] flex-col justify-center gap-10 px-8 pb-24 pt-10 md:px-16">
      <SlideHeader
        label="09 / RESPONSIBLE AI"
        title="Use AI. Keep control."
        intro="AI is an assistant, not an authority."
      />

      <ul className="divide-y divide-line border-y border-line">
        {PRACTICES.map(({ id, title, text }) => (
          <li
            key={id}
            data-anim="stagger"
            className="grid grid-cols-[2rem_1fr] items-center gap-x-4 gap-y-1 py-4 md:grid-cols-[2rem_minmax(0,20rem)_1fr]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-tint text-accent-text">
              <Check size={18} aria-hidden="true" />
            </span>
            <span className="font-display text-3xl font-extrabold uppercase leading-none md:text-4xl">
              {title}
            </span>
            <span className="col-start-2 text-lg text-ink-soft md:col-start-3">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}