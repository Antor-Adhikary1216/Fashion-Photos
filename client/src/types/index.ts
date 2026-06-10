export type UserRole = 'user' | 'admin'

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  isEmailVerified: boolean
  mfaEnabled: boolean
  profileImageUrl: string | null
  profileImageSource: 'gravatar' | 'upload' | null
  lastLoginAt?: string
  createdAt: string
  updatedAt: string
}

export type Album = {
  _id: string
  title: string
  slug: string
  category: string
  coverImage: string
  description: string
  date?: string
  location: string
  isPrivate: boolean
}

export type Photo = {
  _id: string
  title: string
  imageUrl: string
  publicId?: string
  category: string
  album?: Album | string
  location?: string
  camera?: string
  lens?: string
  description?: string
  isFeatured: boolean
  createdAt?: string
}

export type Service = {
  _id: string
  title: string
  description: string
  price: string
  duration: string
  image: string
  features: string[]
}

export type Testimonial = {
  _id: string
  clientName: string
  clientImage?: string
  review: string
  rating: number
  projectType: string
}

export type Blog = {
  _id: string
  title: string
  slug: string
  thumbnail: string
  content: string
  category: string
  author: string
  createdAt?: string
}

export type Booking = {
  _id: string
  name: string
  email: string
  phone: string
  serviceType: string
  shootDate?: string
  location: string
  budget: string
  message: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt?: string
}

export type DashboardStats = {
  totalPhotos: number
  totalAlbums: number
  totalBookings: number
  pendingBookings: number
  totalServices: number
  totalTestimonials: number
  totalBlogs: number
}
