import { AlbumCard } from '@/components/AlbumCard'
import { PageHeader } from '@/components/PageHeader'
import { fallbackAlbums } from '@/data/fallback'
import { useApiResource } from '@/hooks/useApiResource'
import type { Album } from '@/types'

export function Albums() {
  const { data: albums } = useApiResource<Album[]>(
    '/albums',
    'albums',
    fallbackAlbums,
  )

  return (
    <main>
      <PageHeader
        eyebrow="Albums"
        title="Complete photography stories, arranged by mood and place."
        copy="Browse wedding, portrait, fashion, travel, event, and product albums."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 md:grid-cols-3">
        {albums.map((album) => (
          <AlbumCard key={album._id} album={album} />
        ))}
      </section>
    </main>
  )
}
