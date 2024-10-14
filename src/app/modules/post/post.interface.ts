import { ObjectId } from 'mongoose'
import { POST_CATEGORY } from './post.constant'

export interface IPost {
  id?: ObjectId
  images: string[]
  post: string
  category: keyof POST_CATEGORY
  isPremium: boolean
  upvote: number
  downvote: number
  userId: ObjectId
  comment: ObjectId
}
