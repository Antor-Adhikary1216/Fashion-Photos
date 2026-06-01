import { PageHeader } from '@/components/PageHeader'

const gear = ['Sony Alpha mirrorless bodies', 'Prime portrait lenses', 'Profoto lighting', 'Color-calibrated editing suite']

export function About() {
  return (
    <main>
      <PageHeader
        eyebrow="About"
        title="A cinematic eye for real moments and refined details."
        copy="FrameStory is led by a photographer who balances documentary patience with editorial craft."
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 lg:grid-cols-[1fr_1.2fr]">
        <img
          src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1400&q=80"
          alt="Professional camera and photography equipment"
          className="h-full min-h-[520px] rounded-[2rem] object-cover"
        />
        <div className="grid gap-6">
          <InfoBlock
            title="Experience"
            copy="Eight years of commissions across weddings, portraits, editorial campaigns, product launches, private events, and travel assignments."
          />
          <InfoBlock
            title="Photography Style"
            copy="Minimal, emotional, and atmospheric. The work favors natural connection, sculpted light, clean compositions, and timeless color."
          />
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="font-serif text-3xl text-white">Camera Gear</h2>
            <ul className="mt-5 grid gap-3 text-stone-300">
              {gear.map((item) => (
                <li key={item}>+ {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

function InfoBlock({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="font-serif text-3xl text-white">{title}</h2>
      <p className="mt-4 leading-8 text-stone-400">{copy}</p>
    </article>
  )
}
