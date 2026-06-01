import { connectDatabase } from '../config/database'
import { AlbumModel } from '../models/Album'
import { BlogModel } from '../models/Blog'
import { PhotoModel } from '../models/Photo'
import { ServiceModel } from '../models/Service'
import { TestimonialModel } from '../models/Testimonial'

const albums = [
  {
    title: 'Golden Vows',
    slug: 'golden-vows',
    category: 'Wedding',
    coverImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
    description: 'A warm, intimate wedding story told through quiet details.',
    date: new Date('2026-02-14'),
    location: 'Udaipur, India',
    isPrivate: false,
  },
  {
    title: 'Noir Portraits',
    slug: 'noir-portraits',
    category: 'Portrait',
    coverImage:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1400&q=80',
    description: 'Studio portraiture with dramatic light and elegant restraint.',
    date: new Date('2026-03-04'),
    location: 'Mumbai, India',
    isPrivate: false,
  },
]

const photos = [
  {
    title: 'First Light',
    imageUrl:
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1000&q=80',
    category: 'Wedding',
    location: 'Udaipur',
    isFeatured: true,
  },
  {
    title: 'Velvet Frame',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
    category: 'Portrait',
    location: 'Mumbai',
    isFeatured: true,
  },
]

const services = [
  {
    title: 'Wedding Photography',
    description: 'Full-day cinematic coverage for modern celebrations.',
    price: 'From $2,400',
    duration: '8-12 hours',
    image:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    features: ['Timeline planning', 'Edited gallery', 'Private album'],
  },
  {
    title: 'Portrait Photography',
    description: 'Elegant studio and location portraits with editorial polish.',
    price: 'From $450',
    duration: '2 hours',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
    features: ['Creative direction', 'Retouched selects', 'Usage guidance'],
  },
]

const testimonials = [
  {
    clientName: 'Aarav and Meera',
    review:
      'FrameStory made our wedding look like memory and cinema at the same time.',
    rating: 5,
    projectType: 'Wedding',
  },
  {
    clientName: 'Nyla Studio',
    review:
      'Every frame felt intentional. The gallery elevated our campaign instantly.',
    rating: 5,
    projectType: 'Fashion',
  },
]

const blogs = [
  {
    title: 'How to Plan a Cinematic Wedding Timeline',
    slug: 'cinematic-wedding-timeline',
    thumbnail:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    content:
      'A strong wedding timeline gives every important scene room to breathe. Start with light, not logistics, and build from there.',
    category: 'Wedding',
    author: 'FrameStory',
  },
]

async function seed() {
  await connectDatabase()

  await Promise.all([
    AlbumModel.deleteMany({}),
    PhotoModel.deleteMany({}),
    ServiceModel.deleteMany({}),
    TestimonialModel.deleteMany({}),
    BlogModel.deleteMany({}),
  ])

  await AlbumModel.insertMany(albums)
  await PhotoModel.insertMany(photos)
  await ServiceModel.insertMany(services)
  await TestimonialModel.insertMany(testimonials)
  await BlogModel.insertMany(blogs)

  console.log('FrameStory seed data created')
  process.exit(0)
}

seed().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
