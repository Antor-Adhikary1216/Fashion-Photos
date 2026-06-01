import { Link } from 'react-router-dom'

import { formatDate } from '@/utils/format'
import type { Album } from '@/types'

export function AlbumCard({ album }: { album: Album }) {
  return (
    <Link
      to={`/albums/${album.slug}`}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={album.coverImage}
          alt={album.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-300">
          {album.category}
        </p>
        <h3 className="mt-2 font-serif text-2xl text-white">{album.title}</h3>
        <p className="mt-3 text-sm text-stone-400">
          {album.location} / {formatDate(album.date)}
        </p>
      </div>
    </Link>
  )
}
