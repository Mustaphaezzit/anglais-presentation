import SlideHeader from '../components/SlideHeader'
import SectionLabel from '../components/SectionLabel'
import WorkflowDiagram from '../components/WorkflowDiagram'

const FLOW = ['UNDERSTAND', 'VERIFY', 'SECURE', 'MAINTAIN']

export default function Slide10Conclusion() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-[1500px] flex-col justify-center gap-10 px-8 pb-24 pt-10 md:px-16">
      <SlideHeader
        label="10 / CONCLUSION"
        title="AI generates. Engineers verify."
        intro="Technical knowledge makes AI code trustworthy."
      />

      <WorkflowDiagram steps={FLOW} ariaLabel="What technical knowledge allows" />



      <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-soft" data-anim="fade">
        Thank you 
      </p>
    </div>
  )
}