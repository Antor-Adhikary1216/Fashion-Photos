import { fallbackServices } from '@/data/fallback'
import { ResourceList } from '@/dashboard/ResourceList'
import type { Service } from '@/types'

export function ManageServices() {
  return (
    <ResourceList<Service>
      title="Manage Services"
      endpoint="/services"
      responseKey="services"
      fallback={fallbackServices}
      renderItem={(service) => (
        <div>
          <p className="font-semibold text-white">{service.title}</p>
          <p className="text-sm text-stone-500">
            {service.price} / {service.duration}
          </p>
        </div>
      )}
    />
  )
}
