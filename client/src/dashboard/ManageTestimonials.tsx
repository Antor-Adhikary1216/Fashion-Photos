import { fallbackTestimonials } from '@/data/fallback'
import { ResourceList } from '@/dashboard/ResourceList'
import type { Testimonial } from '@/types'

export function ManageTestimonials() {
  return (
    <ResourceList<Testimonial>
      title="Manage Testimonials"
      endpoint="/testimonials"
      responseKey="testimonials"
      fallback={fallbackTestimonials}
      renderItem={(testimonial) => (
        <div>
          <p className="font-semibold text-white">{testimonial.clientName}</p>
          <p className="text-sm text-stone-500">{testimonial.projectType}</p>
        </div>
      )}
    />
  )
}
