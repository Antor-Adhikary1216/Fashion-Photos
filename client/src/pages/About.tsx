import { PageHeader } from '@/components/PageHeader'

const aboutMilestones = [
  {
    title: 'Experience',
    copy: 'Eight years of commissions across weddings, portraits, campaigns, events, products, and travel assignments.',
  },
  {
    title: 'Photography Style',
    copy: 'Minimal, emotional, and atmospheric work shaped by natural connection, sculpted light, and timeless color.',
  },
  {
    title: 'Creative Workflow',
    copy: 'Every shoot begins with a mood, shot list, location plan, and clear delivery goals before the camera comes out.',
  },
  {
    title: 'Camera Gear',
    copy: 'Sony Alpha mirrorless bodies, prime portrait lenses, Profoto lighting, and a color-calibrated editing suite.',
  },
  {
    title: 'Editing Approach',
    copy: 'Skin tones stay honest, highlights stay soft, and every gallery receives a consistent editorial grade.',
  },
  {
    title: 'Client Direction',
    copy: 'Gentle posing, calm prompts, and practical timing help clients feel confident without looking staged.',
  },
  {
    title: 'Delivery',
    copy: 'Private online galleries, web-ready exports, print-ready files, and curated highlights for quick sharing.',
  },
  {
    title: 'Planning Support',
    copy: 'Timeline advice, wardrobe guidance, location ideas, and brand references are included before production.',
  },
  {
    title: 'Recognition',
    copy: 'Trusted by couples, designers, founders, boutique venues, and creative studios across premium visual projects.',
  },
  {
    title: 'Values',
    copy: 'The work is patient, polished, and people-first, with an eye for images that still feel alive years later.',
  },
]

export function About() {
  return (
    <main>
      <PageHeader
        eyebrow="About"
        title="A cinematic eye for real moments and refined details."
        copy="Fashion-Photos balances documentary patience with editorial craft, turning each commission into a polished visual story."
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 lg:grid-cols-[0.9fr_1.1fr]">
        <img
          src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1400&q=80"
          alt="Professional camera and photography equipment"
          className="h-full min-h-[620px] rounded-[2rem] object-cover"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {aboutMilestones.map((milestone) => (
            <InfoBlock
              key={milestone.title}
              title={milestone.title}
              copy={milestone.copy}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

function InfoBlock({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="font-serif text-2xl text-white">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-stone-400">{copy}</p>
    </article>
  )
}
