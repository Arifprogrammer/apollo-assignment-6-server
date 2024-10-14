import { Schema, Types, model } from 'mongoose'
import { IComment } from './comment.interface'

const commentSchema = new Schema<IComment>(
  {
    userId: {
      type: Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'User',
      trim: true,
    },
    postId: {
      type: Types.ObjectId,
      required: [true, 'Post id is required'],
      ref: 'Post',
      trim: true,
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      trim: true,
    },
  },
  { versionKey: false, timestamps: true },
)

export const Comment = model<IComment>('Comment', commentSchema)
