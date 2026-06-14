import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

import { AlbumCard } from '@/components/AlbumCard'
import { PhotoCard } from '@/components/PhotoCard'
import { ServiceCard } from '@/components/ServiceCard'
import { TestimonialCard } from '@/components/TestimonialCard'
import {
  fallbackAlbums,
  fallbackPhotos,
  fallbackServices,
  fallbackTestimonials,
} from '@/data/fallback'
import { useAuth } from '@/context/AuthContext'
import { useApiResource } from '@/hooks/useApiResource'
import type { Album, Photo, Service, Testimonial } from '@/types'
import { buildAuthPath } from '@/utils/redirect'

const featuredFallbackPhotos = fallbackPhotos.filter((photo) => photo.isFeatured)
const homeAlbumLimit = 3
const homePhotoLimit = 3
const homeServiceLimit = 3
const homeTestimonialLimit = 2

export function Home() {
  const { user, isLoading } = useAuth()
  const { data: albums } = useApiResource<Album[]>(
    '/albums',
    'albums',
    fallbackAlbums,
  )
  const { data: photos } = useApiResource<Photo[]>(
    '/photos?featured=true',
    'photos',
    featuredFallbackPhotos,
  )
  const { data: services } = useApiResource<Service[]>(
    '/services',
    'services',
    fallbackServices,
  )
  const { data: testimonials } = useApiResource<Testimonial[]>(
    '/testimonials',
    'testimonials',
    fallbackTestimonials,
  )
  const canOpenProtectedLinks = isLoading || user
  const galleryPath = canOpenProtectedLinks
    ? '/gallery'
    : buildAuthPath('/login', '/gallery')
  const contactPath = canOpenProtectedLinks
    ? '/contact'
    : buildAuthPath('/login', '/contact')
  const aboutPath = canOpenProtectedLinks
    ? '/about'
    : buildAuthPath('/login', '/about')

  return (
    <main>
      <section className="relative grid min-h-screen place-items-center overflow-hidden px-5">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=85"
          alt="Cinematic wedding couple portrait"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.45em] text-gold-200">
            Luxury Photography Portfolio
          </p>
          <h1 className="mt-6 font-serif text-6xl text-white md:text-8xl">
            Fashion-Photos
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-200">
            Cinematic photography for weddings, portraits, events, products,
            fashion, and travel stories with a refined editorial eye.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to={galleryPath}
              className="rounded-full bg-gold-400 px-7 py-3 font-semibold text-black"
            >
              View Portfolio
            </Link>
            <Link
              to={contactPath}
              className="rounded-full border border-white/25 px-7 py-3 font-semibold text-white"
            >
              Book a Shoot
            </Link>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Featured Albums"
        title="Stories composed with depth, atmosphere, and intention."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {albums.slice(0, homeAlbumLimit).map((album) => (
            <AlbumCard key={album._id} album={album} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Featured Photos" title="A few frames from the archive.">
        <div className="grid gap-5 md:grid-cols-3">
          {photos.slice(0, homePhotoLimit).map((photo) => (
            <PhotoCard key={photo._id} photo={photo} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Services" title="Photography for personal and brand stories.">
        <div className="grid gap-6 lg:grid-cols-3">
          {services.slice(0, homeServiceLimit).map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </Section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=80"
          alt="Photographer holding a camera"
          className="h-full min-h-[420px] rounded-3xl object-cover"
        />
        <div className="flex flex-col justify-center">
          <p className="text-sm uppercase tracking-[0.35em] text-gold-300">
            About the Studio
          </p>
          <h2 className="mt-4 font-serif text-4xl text-white md:text-6xl">
            Quiet direction, dramatic light, honest emotion.
          </h2>
          <p className="mt-6 text-lg leading-8 text-stone-400">
            Fashion-Photos blends documentary instinct with editorial polish. Every
            commission is planned with care, photographed with patience, and
            delivered as a gallery that feels timeless.
          </p>
          <Link
            to={aboutPath}
            className="mt-8 w-fit rounded-full border border-gold-300 px-6 py-3 text-gold-200"
          >
            Meet the photographer
          </Link>
        </div>
      </section>

      <Section eyebrow="Testimonials" title="Trusted by couples and creative teams.">
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.slice(0, homeTestimonialLimit).map((testimonial) => (
            <TestimonialCard
              key={testimonial._id}
              testimonial={testimonial}
            />
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="rounded-[2rem] border border-gold-300/30 bg-gold-400 p-10 text-black md:p-16">
          <p className="text-sm font-semibold uppercase tracking-[0.3em]">
            Booking Call To Action
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl md:text-6xl">
            Let us shape your next story into a cinematic gallery.
          </h2>
          <Link
            to={contactPath}
            className="mt-8 inline-flex rounded-full bg-black px-7 py-3 font-semibold text-white"
          >
            Start a booking request
          </Link>
        </div>
      </section>
    </main>
  )
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-gold-300">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-serif text-4xl text-white md:text-6xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}
