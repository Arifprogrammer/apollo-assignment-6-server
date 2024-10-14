import { ObjectId } from 'mongoose'

export interface IComment {
  id?: ObjectId
  userId: ObjectId
  postId: ObjectId
  comment: string
}
