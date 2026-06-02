import mongoose, { Schema, model, type HydratedDocument, type Model } from 'mongoose'

export interface Album {
  title: string
  slug: string
  category: string
  coverImage: string
  description: string
  date?: Date
  location: string
  isPrivate: boolean
  createdAt: Date
  updatedAt: Date
}

export type AlbumDocument = HydratedDocument<Album>

const albumSchema = new Schema<Album>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 140,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    coverImage: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    date: {
      type: Date,
    },
    location: {
      type: String,
      default: '',
      trim: true,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

albumSchema.index({ category: 1 })

export const AlbumModel = mongoose.models.Album
  ? (mongoose.models.Album as Model<Album>)
  : model<Album>('Album', albumSchema)
