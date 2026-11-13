import SlideHeader from '../components/SlideHeader'

const ADVANTAGES = [
  { id: 'speed', title: 'Speed', text: 'Routine code in seconds' },
  { id: 'prototyping', title: 'Prototyping', text: 'From idea to demo, fast' },
  { id: 'productivity', title: 'Productivity', text: 'Less repetitive work' },
  { id: 'learning', title: 'Learning', text: 'Instant examples and explanations' },
]

export default function Slide06Advantages() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-[1500px] flex-col justify-center gap-10 px-8 pb-24 pt-10 md:px-16">
      <SlideHeader
        label="06 / OPPORTUNITIES"
        title="Why are developers adopting it?"
        intro="From idea to first version, faster."
      />

      <ol className="divide-y divide-line border-y border-line">
        {ADVANTAGES.map(({ id, title, text }, i) => (
          <li
            key={id}
            data-anim="stagger"
            className="grid grid-cols-[4rem_1fr] items-baseline gap-x-4 py-4 md:grid-cols-[6rem_minmax(0,22rem)_1fr]"
          >
            <span className="font-display text-5xl font-extrabold leading-none text-accent-text md:text-6xl">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display text-3xl font-extrabold uppercase leading-none md:text-4xl">
              {title}
            </h3>
            <p className="col-span-2 mt-1 text-lg text-ink-soft md:col-span-1 md:mt-0">{text}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}