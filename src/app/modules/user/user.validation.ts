import { z } from 'zod'
import { userCreateValidationSchema } from '../auth/auth.validation'

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

export const updateUserSchema = userCreateValidationSchema
  .omit({ password: true })
  .partial()
