import { ShieldAlert, Database, EyeOff, Blocks } from 'lucide-react'
import SlideHeader from '../components/SlideHeader'
import SectionLabel from '../components/SectionLabel'

const RISKS = [
  { id: 'security', tag: 'SECURITY', icon: ShieldAlert, title: 'Vulnerabilities', text: 'Weak login, SQL injection' },
  { id: 'data', tag: 'DATA', icon: Database, title: 'Integrity', text: 'Missing transactions, broken records' },
  { id: 'privacy', tag: 'PRIVACY', icon: EyeOff, title: 'Exposed data', text: 'Personal data left unprotected' },
  { id: 'maintenance', tag: 'MAINTENANCE', icon: Blocks, title: 'Fragile code', text: 'Hidden bugs, hard to change' },
]

export default function Slide07Risks() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-[1500px] items-center px-8 pb-24 pt-10 md:px-16">
      <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:items-center lg:gap-12">
        <SlideHeader
          label="07 / RISKS & RESPONSIBILITY"
          title="When generated code becomes a problem"
          intro="A working demo is not a safe app."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {RISKS.map(({ id, tag, icon: Icon, title, text }) => (
            <article key={id} data-anim="stagger" className="panel p-5">
              <div className="flex items-center gap-2">
                <Icon size={18} className="shrink-0 text-amber-700" aria-hidden="true" />
                <SectionLabel className="text-amber-700">{tag}</SectionLabel>
              </div>
              <h3 className="mt-3 font-display text-2xl font-extrabold uppercase leading-none">
                {title}
              </h3>
              <p className="mt-2 text-ink-soft">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}