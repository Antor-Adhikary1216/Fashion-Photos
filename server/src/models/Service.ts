import { Schema, model, models, type HydratedDocument, type Model } from 'mongoose'

export interface Service {
  title: string
  description: string
  price: string
  duration: string
  image: string
  features: string[]
  createdAt: Date
  updatedAt: Date
}

export type ServiceDocument = HydratedDocument<Service>

const serviceSchema = new Schema<Service>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

export const ServiceModel = models.Service
  ? (models.Service as Model<Service>)
  : model<Service>('Service', serviceSchema)
