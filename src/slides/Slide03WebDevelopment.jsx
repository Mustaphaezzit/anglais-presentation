import { Monitor, Server, Database, FlaskConical } from 'lucide-react'
import SlideHeader from '../components/SlideHeader'
import InfoCard from '../components/InfoCard'

const LAYERS = [
  {
    id: 'frontend',
    icon: Monitor,
    tag: 'WHAT YOU SEE',
    title: 'Frontend',
    text: 'The pages, buttons and forms. AI can draft the design and layout.',
  },
  {
    id: 'backend',
    icon: Server,
    tag: 'THE LOGIC',
    title: 'Backend',
    text: 'The rules behind the screen. AI can write the code that handles bookings and logins.',
  },
  {
    id: 'database',
    icon: Database,
    tag: 'THE MEMORY',
    title: 'Database',
    text: 'Where information is stored. AI can suggest how to organize and retrieve it.',
  },
  {
    id: 'tests',
    icon: FlaskConical,
    tag: 'THE CHECKS',
    title: 'Tests',
    text: 'Proof that everything works. AI can propose test cases and help find bugs.',
  },
]

export default function Slide03WebDevelopment() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-[1500px] flex-col justify-center gap-10 px-8 pb-24 pt-10 md:px-16">
      <SlideHeader
        label="03 / DEVELOPMENT WORKFLOW"
        title="AI across the stack"
        intro="Every layer of a website can use AI."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LAYERS.map(({ id, icon, tag, title, text }) => (
          <InfoCard key={id} icon={icon} tag={tag} title={title}>
            <p className="text-lg">{text}</p>
          </InfoCard>
        ))}
      </div>
    </div>
  )
}