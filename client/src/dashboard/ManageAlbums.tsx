import { fallbackAlbums } from '@/data/fallback'
import { ResourceList } from '@/dashboard/ResourceList'
import type { Album } from '@/types'

export function ManageAlbums() {
  return (
    <ResourceList<Album>
      title="Manage Albums"
      endpoint="/albums"
      responseKey="albums"
      fallback={fallbackAlbums}
      renderItem={(album) => (
        <>
          <img
            src={album.coverImage}
            alt={album.title}
            className="h-16 w-16 rounded-xl object-cover"
          />
          <div>
            <p className="font-semibold text-white">{album.title}</p>
            <p className="text-sm text-stone-500">{album.category}</p>
          </div>
        </>
      )}
    />
  )
}
