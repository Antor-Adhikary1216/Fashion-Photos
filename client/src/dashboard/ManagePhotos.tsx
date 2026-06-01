import { fallbackPhotos } from '@/data/fallback'
import { ResourceList } from '@/dashboard/ResourceList'
import type { Photo } from '@/types'

export function ManagePhotos() {
  return (
    <ResourceList<Photo>
      title="Manage Photos"
      endpoint="/photos"
      responseKey="photos"
      fallback={fallbackPhotos}
      renderItem={(photo) => (
        <>
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="h-16 w-16 rounded-xl object-cover"
          />
          <div>
            <p className="font-semibold text-white">{photo.title}</p>
            <p className="text-sm text-stone-500">{photo.category}</p>
          </div>
        </>
      )}
    />
  )
}
