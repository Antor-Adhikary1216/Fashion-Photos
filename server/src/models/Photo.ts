import mongoose, {
  Schema,
  Types,
  model,
  type HydratedDocument,
  type Model,
} from 'mongoose'

export interface Photo {
  title: string
  imageUrl: string
  publicId?: string
  category: string
  album?: Types.ObjectId
  location?: string
  camera?: string
  lens?: string
  description?: string
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
}

export type PhotoDocument = HydratedDocument<Photo>

const photoSchema = new Schema<Photo>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 140,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    album: {
      type: Schema.Types.ObjectId,
      ref: 'Album',
    },
    location: {
      type: String,
      trim: true,
    },
    camera: {
      type: String,
      trim: true,
    },
    lens: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

photoSchema.index({ category: 1 })
photoSchema.index({ album: 1 })
photoSchema.index({ isFeatured: 1 })

export const PhotoModel = mongoose.models.Photo
  ? (mongoose.models.Photo as Model<Photo>)
  : model<Photo>('Photo', photoSchema)
