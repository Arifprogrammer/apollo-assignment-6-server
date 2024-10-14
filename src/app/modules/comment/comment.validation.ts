import { z } from 'zod'

export const commentCreateValidationSchema = z.object({
  comment: z
    .string({
      required_error: 'Comment is required',
      invalid_type_error: 'Comment must be a string',
    })
    .min(1)
    .trim(),
  userId: z
    .string({
      required_error: 'User id is required',
      invalid_type_error: 'User id must be a string',
    })
    .trim(),
  postId: z
    .string({
      required_error: 'Post id is required',
      invalid_type_error: 'Post id must be a string',
    })
    .trim(),
})

export const commentUpdateValidationSchema =
  commentCreateValidationSchema.partial()
