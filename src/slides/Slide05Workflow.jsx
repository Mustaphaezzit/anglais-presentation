import { Check, Minus } from 'lucide-react'
import SlideHeader from '../components/SlideHeader'
import InfoCard from '../components/InfoCard'
import WorkflowDiagram from '../components/WorkflowDiagram'

const FLOW = ['DESCRIBE', 'GENERATE', 'REVIEW', 'TEST', 'IMPROVE', 'DEPLOY']
const PROTOTYPE = ['Proves an idea', 'Works in a demo', 'Quick to build']
const PRODUCTION = ['Secure', 'Reliable', 'Maintainable', 'Tested']

function PointList({ icon: Icon, items }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-lg text-ink">
          <Icon size={16} className="shrink-0 text-accent-text" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function Slide05Workflow() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-[1500px] flex-col justify-center gap-10 px-8 pb-24 pt-10 md:px-16">
      <SlideHeader
        label="05 / THE REAL WORKFLOW"
        title="From prompt to production"
        intro="A prototype is not a product."
      />

      <WorkflowDiagram steps={FLOW} ariaLabel="From prompt to production" />

      <div className="grid gap-4 md:grid-cols-2">
        <InfoCard title="Prototype" anim="panel">
          <PointList icon={Minus} items={PROTOTYPE} />
        </InfoCard>
        <InfoCard title="Production" accent anim="panel">
          <PointList icon={Check} items={PRODUCTION} />
        </InfoCard>
      </div>
    </div>
  )
}