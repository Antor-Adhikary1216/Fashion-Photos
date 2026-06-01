import { useMemo, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'

import { PageHeader } from '@/components/PageHeader'
import { PhotoCard } from '@/components/PhotoCard'
import { fallbackPhotos } from '@/data/fallback'
import { useApiResource } from '@/hooks/useApiResource'
import type { Photo } from '@/types'

export function Gallery() {
  const [category, setCategory] = useState('All')
  const [activeIndex, setActiveIndex] = useState(-1)
  const { data: photos } = useApiResource<Photo[]>(
    '/photos',
    'photos',
    fallbackPhotos,
  )
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(photos.map((photo) => photo.category)))],
    [photos],
  )
  const filteredPhotos =
    category === 'All'
      ? photos
      : photos.filter((photo) => photo.category === category)

  return (
    <main>
      <PageHeader
        eyebrow="Gallery"
        title="A modern image archive with cinematic range."
        copy="Filter by category, open a frame, and move through the visual story in a focused lightbox."
      />
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2 text-sm ${
                category === item
                  ? 'bg-gold-400 text-black'
                  : 'border border-white/10 text-stone-300'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="masonry">
          {filteredPhotos.map((photo, index) => (
            <PhotoCard
              key={photo._id}
              photo={photo}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </section>
      <Lightbox
        open={activeIndex >= 0}
        close={() => setActiveIndex(-1)}
        index={activeIndex}
        slides={filteredPhotos.map((photo) => ({
          src: photo.imageUrl,
          alt: photo.title,
        }))}
      />
    </main>
  )
}
