import mongoose, { Schema, model, type HydratedDocument, type Model } from 'mongoose'

export interface Blog {
  title: string
  slug: string
  thumbnail: string
  content: string
  category: string
  author: string
  createdAt: Date
  updatedAt: Date
}

export type BlogDocument = HydratedDocument<Blog>

const blogSchema = new Schema<Blog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
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

blogSchema.index({ category: 1 })

export const BlogModel = mongoose.models.Blog
  ? (mongoose.models.Blog as Model<Blog>)
  : model<Blog>('Blog', blogSchema)
