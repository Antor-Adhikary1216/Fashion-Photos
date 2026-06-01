import type { Service } from '@/types'

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <img
        src={service.image}
        alt={service.title}
        loading="lazy"
        className="h-56 w-full object-cover"
      />
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-2xl text-white">{service.title}</h3>
          <span className="rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold text-black">
            {service.price}
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-stone-400">
          {service.description}
        </p>
        <p className="mt-4 text-sm text-gold-200">{service.duration}</p>
        <ul className="mt-5 grid gap-2 text-sm text-stone-300">
          {service.features.map((feature) => (
            <li key={feature}>+ {feature}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}
