import { Code, Bug, BookOpen, FlaskConical } from 'lucide-react'
import SlideHeader from '../components/SlideHeader'
import InfoCard from '../components/InfoCard'

const CAPABILITIES = [
  { id: 'generate', icon: Code, title: 'Generate', text: 'Writes code from a description' },
  { id: 'debug', icon: Bug, title: 'Debug', text: 'Finds and explains errors' },
  { id: 'explain', icon: BookOpen, title: 'Explain', text: 'Clarifies unfamiliar code' },
  { id: 'test', icon: FlaskConical, title: 'Test', text: 'Suggests test cases' },
]

export default function Slide02AI() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-[1500px] flex-col justify-center gap-10 px-8 pb-24 pt-10 md:px-16">
      <SlideHeader
        label="02 / FOUNDATIONS"
        title="What is AI in software development?"
        intro="AI suggests. You verify."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-center lg:gap-12">
        <InfoCard tag="DEFINITION" title="LLM" accent anim="fade">
          Large Language Model: trained on huge amounts of text and code.
        </InfoCard>

        <ol className="divide-y divide-line border-y border-line">
          {CAPABILITIES.map(({ id, icon: Icon, title, text }, i) => (
            <li key={id} data-anim="stagger" className="flex items-center gap-4 py-3">
              <span className="font-mono text-sm text-accent-text">
                {String(i + 1).padStart(2, '0')}
              </span>
              <Icon size={24} className="shrink-0 text-accent-text" aria-hidden="true" />
              <h3 className="font-display text-3xl font-extrabold uppercase leading-none">
                {title}
              </h3>
              <p className="ml-auto hidden text-ink-soft sm:block">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}