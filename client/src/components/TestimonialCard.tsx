import { FiStar } from 'react-icons/fi'

import type { Testimonial } from '@/types'

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <div className="flex gap-1 text-gold-300">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <FiStar key={index} />
        ))}
      </div>
      <p className="mt-5 text-lg leading-8 text-stone-200">
        "{testimonial.review}"
      </p>
      <p className="mt-6 font-serif text-xl text-white">
        {testimonial.clientName}
      </p>
      <p className="text-sm text-stone-500">{testimonial.projectType}</p>
    </article>
  )
}
