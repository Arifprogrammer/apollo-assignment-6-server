import { z } from 'zod'

export const followingSchema = z.object({
  followingUserId: z
    .string({
      required_error: 'Following user id is required',
      invalid_type_error: 'Following user id must be a string',
    })
    .trim(),
})

export const favoritePostSchema = z.object({
  postId: z
    .string({
      required_error: 'Post id is required',
      invalid_type_error: 'Post id must be a string',
    })
    .trim(),
})
