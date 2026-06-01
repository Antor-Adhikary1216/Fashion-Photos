import { Schema, model, models, type HydratedDocument, type Model } from 'mongoose'

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export interface Booking {
  name: string
  email: string
  phone: string
  serviceType: string
  shootDate?: Date
  location: string
  budget: string
  message: string
  status: BookingStatus
  createdAt: Date
  updatedAt: Date
}

export type BookingDocument = HydratedDocument<Booking>

const bookingSchema = new Schema<Booking>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 40,
    },
    serviceType: {
      type: String,
      required: true,
      trim: true,
    },
    shootDate: {
      type: Date,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    budget: {
      type: String,
      default: '',
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

bookingSchema.index({ status: 1, createdAt: -1 })
bookingSchema.index({ email: 1 })

export const BookingModel = models.Booking
  ? (models.Booking as Model<Booking>)
  : model<Booking>('Booking', bookingSchema)
