import type { Album, Blog, Photo, Service, Testimonial } from '@/types'

export const fallbackAlbums: Album[] = [
  {
    _id: 'album-1',
    title: 'Golden Vows',
    slug: 'golden-vows',
    category: 'Wedding',
    coverImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
    description: 'A warm, intimate wedding story told through quiet details.',
    date: '2026-02-14',
    location: 'Udaipur, India',
    isPrivate: false,
  },
  {
    _id: 'album-2',
    title: 'Noir Portraits',
    slug: 'noir-portraits',
    category: 'Portrait',
    coverImage:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1400&q=80',
    description: 'Studio portraiture with dramatic light and elegant restraint.',
    date: '2026-03-04',
    location: 'Mumbai, India',
    isPrivate: false,
  },
  {
    _id: 'album-3',
    title: 'Runway After Dark',
    slug: 'runway-after-dark',
    category: 'Fashion',
    coverImage:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=80',
    description: 'Editorial fashion frames with cinematic city energy.',
    date: '2026-04-18',
    location: 'Delhi, India',
    isPrivate: false,
  },
]

export const fallbackPhotos: Photo[] = [
  {
    _id: 'photo-1',
    title: 'First Light',
    imageUrl:
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1000&q=80',
    category: 'Wedding',
    location: 'Udaipur',
    isFeatured: true,
  },
  {
    _id: 'photo-2',
    title: 'Velvet Frame',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
    category: 'Portrait',
    location: 'Mumbai',
    isFeatured: true,
  },
  {
    _id: 'photo-3',
    title: 'Editorial Gold',
    imageUrl:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
    category: 'Fashion',
    location: 'Delhi',
    isFeatured: true,
  },
  {
    _id: 'photo-4',
    title: 'Quiet Coast',
    imageUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
    category: 'Travel',
    location: 'Goa',
    isFeatured: false,
  },
]

export const fallbackServices: Service[] = [
  {
    _id: 'service-1',
    title: 'Wedding Photography',
    description: 'Full-day cinematic coverage for modern celebrations.',
    price: 'From $2,400',
    duration: '8-12 hours',
    image:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    features: ['Timeline planning', 'Edited gallery', 'Private album'],
  },
  {
    _id: 'service-2',
    title: 'Portrait Photography',
    description: 'Elegant studio and location portraits with editorial polish.',
    price: 'From $450',
    duration: '2 hours',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
    features: ['Creative direction', 'Retouched selects', 'Usage guidance'],
  },
  {
    _id: 'service-3',
    title: 'Event Photography',
    description: 'Documentary coverage for launches, celebrations, and panels.',
    price: 'From $900',
    duration: '4 hours',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    features: ['Rapid previews', 'Brand-safe delivery', 'Online gallery'],
  },
]

export const fallbackTestimonials: Testimonial[] = [
  {
    _id: 'testimonial-1',
    clientName: 'Aarav and Meera',
    review:
      'FrameStory made our wedding look like memory and cinema at the same time.',
    rating: 5,
    projectType: 'Wedding',
  },
  {
    _id: 'testimonial-2',
    clientName: 'Nyla Studio',
    review:
      'Every frame felt intentional. The gallery elevated our campaign instantly.',
    rating: 5,
    projectType: 'Fashion',
  },
]

export const fallbackBlogs: Blog[] = [
  {
    _id: 'blog-1',
    title: 'How to Plan a Cinematic Wedding Timeline',
    slug: 'cinematic-wedding-timeline',
    thumbnail:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    content:
      'A strong wedding timeline gives every important scene room to breathe. Start with light, not logistics, and build from there.',
    category: 'Wedding',
    author: 'FrameStory',
    createdAt: '2026-05-03',
  },
  {
    _id: 'blog-2',
    title: 'The Portrait Session Prep Guide',
    slug: 'portrait-session-prep-guide',
    thumbnail:
      'https://images.unsplash.com/photo-1496440737103-cd596325d314?auto=format&fit=crop&w=1200&q=80',
    content:
      'Portrait preparation is less about perfection and more about clarity. Wardrobe, mood, and location should all support one idea.',
    category: 'Portrait',
    author: 'FrameStory',
    createdAt: '2026-05-11',
  },
]
