import { TriangleAlert, ShieldAlert } from 'lucide-react'
import SlideHeader from './components/SlideHeader'
import SectionLabel from './components/SectionLabel'
import InfoCard from './components/InfoCard'
import CodePanel from './components/CodePanel'
import ComparisonTable from './components/ComparisonTable'
import WorkflowDiagram from './components/WorkflowDiagram'
import SourceLink from './components/SourceLink'
import QuoteBlock from './components/QuoteBlock'
import TakeawayBand from './components/TakeawayBand'

const headers = ['Aspect', 'Experienced developer', 'Non-programmer']
const rows = [
  ['Security', 'Reviews authentication and validation', 'May trust the output as is'],
  ['Data', 'Uses transactions and rollback', 'May only check that the button works'],
]
const steps = ['Idea', 'Prompt', 'AI-generated code', 'Review', 'Testing', 'Improvement']
const code = `Build a vehicle rental platform with:
- User authentication
- Vehicle listings
- Booking management`

export default function Demo() {
  return (
    <div className="h-dvh overflow-y-auto">
      <div className="mx-auto max-w-5xl space-y-16 p-8">
        <SlideHeader level={1} size="xl" label="01 / INTRODUCTION" title="Cover title" intro="Intro text for the header." />
        <SlideHeader label="02 / FOUNDATIONS" title="Regular slide title" intro="Intro text." />
        <SectionLabel>Section label</SectionLabel>

        <div className="grid gap-4 md:grid-cols-3">
          <InfoCard tag="FRONTEND" title="Default">Card body text.</InfoCard>
          <InfoCard tag="ACCENT" title="Accent" accent>Accent variant.</InfoCard>
          <InfoCard tag="SECURITY" title="With icon" icon={TriangleAlert}>Icon plus text label.</InfoCard>
          <InfoCard tag="PRIVACY" icon={ShieldAlert}>Without title.</InfoCard>
        </div>

        <CodePanel title="prompt.txt" language="text" code={code} />
        <CodePanel title="typing.txt" language="text" code={code} typing />

        <ComparisonTable headers={headers} rows={rows} caption="Demo comparison" />

        <WorkflowDiagram steps={steps} ariaLabel="Horizontal workflow" />
        <WorkflowDiagram steps={steps.slice(0, 4)} orientation="vertical" ariaLabel="Vertical workflow" />

        <ol>
          <SourceLink number={1} title="OWASP Top 10 for LLM Applications" url="https://genai.owasp.org/llm-top-10/" />
          <SourceLink number={2} title="GitHub Copilot Documentation" url="https://docs.github.com/en/copilot" />
        </ol>

        <QuoteBlock caption="Statement from the brief">
          AI can generate code, but technical knowledge allows developers to understand, verify, secure, and maintain it.
        </QuoteBlock>

        <TakeawayBand>Its output must still be verified.</TakeawayBand>
      </div>
    </div>
  )
}