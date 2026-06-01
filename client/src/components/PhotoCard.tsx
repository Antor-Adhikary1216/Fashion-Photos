import type { Photo } from '@/types'

export function PhotoCard({
  photo,
  onClick,
}: {
  photo: Photo
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group mb-5 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left"
    >
      <img
        src={photo.imageUrl}
        alt={photo.title}
        loading="lazy"
        className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="p-4">
        <p className="text-sm uppercase tracking-[0.25em] text-gold-300">
          {photo.category}
        </p>
        <h3 className="mt-2 font-serif text-xl text-white">{photo.title}</h3>
        {photo.location ? (
          <p className="mt-1 text-sm text-stone-400">{photo.location}</p>
        ) : null}
      </div>
    </button>
  )
}
