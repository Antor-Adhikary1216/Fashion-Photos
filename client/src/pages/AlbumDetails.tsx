import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { PageHeader } from '@/components/PageHeader'
import { PhotoCard } from '@/components/PhotoCard'
import { api } from '@/api/http'
import { fallbackAlbums, fallbackPhotos } from '@/data/fallback'
import type { Album, Photo } from '@/types'

export function AlbumDetails() {
  const { slug } = useParams()
  const [album, setAlbum] = useState<Album | null>(
    fallbackAlbums.find((item) => item.slug === slug) ?? fallbackAlbums[0],
  )
  const [photos, setPhotos] = useState<Photo[]>(fallbackPhotos)

  useEffect(() => {
    async function loadAlbum() {
      try {
        const response = await api.get(`/albums/${slug}`)
        setAlbum(response.data.album)
        setPhotos(response.data.photos)
      } catch {
        setAlbum(fallbackAlbums.find((item) => item.slug === slug) ?? null)
        setPhotos(fallbackPhotos)
      }
    }

    if (slug) {
      void loadAlbum()
    }
  }, [slug])

  if (!album) {
    return (
      <main className="min-h-screen px-5 pt-36 text-center text-stone-300">
        Album not found.
      </main>
    )
  }

  return (
    <main>
      <PageHeader
        eyebrow={album.category}
        title={album.title}
        copy={`${album.description} ${album.location ? `Captured in ${album.location}.` : ''}`}
      />
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <img
          src={album.coverImage}
          alt={album.title}
          className="mb-10 h-[55vh] w-full rounded-[2rem] object-cover"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {photos.map((photo) => (
            <PhotoCard key={photo._id} photo={photo} />
          ))}
        </div>
      </section>
    </main>
  )
}
