import mongoose, { Schema, model, type HydratedDocument, type Model } from 'mongoose'

export interface Testimonial {
  clientName: string
  clientImage?: string
  review: string
  rating: number
  projectType: string
  createdAt: Date
  updatedAt: Date
}

export type TestimonialDocument = HydratedDocument<Testimonial>

const testimonialSchema = new Schema<Testimonial>(
  {
    clientName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    clientImage: {
      type: String,
      trim: true,
    },
    review: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    projectType: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

export const TestimonialModel = mongoose.models.Testimonial
  ? (mongoose.models.Testimonial as Model<Testimonial>)
  : model<Testimonial>('Testimonial', testimonialSchema)
