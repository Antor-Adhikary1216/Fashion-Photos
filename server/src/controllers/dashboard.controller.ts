import type { Request, Response } from 'express'

import { AlbumModel } from '../models/Album'
import { BookingModel } from '../models/Booking'
import { BlogModel } from '../models/Blog'
import { PhotoModel } from '../models/Photo'
import { ServiceModel } from '../models/Service'
import { TestimonialModel } from '../models/Testimonial'

export async function getDashboardStats(_req: Request, res: Response) {
  const [
    totalPhotos,
    totalAlbums,
    totalBookings,
    pendingBookings,
    totalServices,
    totalTestimonials,
    totalBlogs,
    recentBookings,
  ] = await Promise.all([
    PhotoModel.countDocuments(),
    AlbumModel.countDocuments(),
    BookingModel.countDocuments(),
    BookingModel.countDocuments({ status: 'pending' }),
    ServiceModel.countDocuments(),
    TestimonialModel.countDocuments(),
    BlogModel.countDocuments(),
    BookingModel.find().sort({ createdAt: -1 }).limit(5),
  ])

  res.status(200).json({
    stats: {
      totalPhotos,
      totalAlbums,
      totalBookings,
      pendingBookings,
      totalServices,
      totalTestimonials,
      totalBlogs,
    },
    recentBookings,
  })
}
