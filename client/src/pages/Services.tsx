import { PageHeader } from '@/components/PageHeader'
import { ServiceCard } from '@/components/ServiceCard'
import { fallbackServices } from '@/data/fallback'
import { useApiResource } from '@/hooks/useApiResource'
import type { Service } from '@/types'

export function Services() {
  const { data: services } = useApiResource<Service[]>(
    '/services',
    'services',
    fallbackServices,
  )

  return (
    <main>
      <PageHeader
        eyebrow="Services"
        title="Coverage for weddings, portraits, events, products, fashion, and travel."
        copy="Each service is built around careful planning, polished direction, and a premium delivery experience."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </section>
    </main>
  )
}
