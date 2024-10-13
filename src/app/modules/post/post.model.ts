import { Schema, Types, model } from 'mongoose'
import { IPost } from './post.interface'
import { POST_CATEGORY } from './post.constant'

const postSchema = new Schema<IPost>(
  {
    images: {
      type: [String],
      default: [],
    },
    post: {
      type: String,
      required: [true, 'Post is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: POST_CATEGORY,
      trim: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    upvote: {
      type: Number,
      default: 0,
    },
    downvote: {
      type: Number,
      default: 0,
    },
    userId: {
      type: Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'User',
      trim: true,
    },
  },
  { versionKey: false, timestamps: true },
)

export const Post = model<IPost>('Post', postSchema)
