import { z } from 'zod'
import { POST_CATEGORY } from './post.constant'

export const postCreateValidationSchema = z.object({
  images: z.string().array().optional(),
  post: z
    .string({
      required_error: 'Post is required',
      invalid_type_error: 'Post must be a string',
    })
    .min(1)
    .trim(),
  category: z.enum(Object.values(POST_CATEGORY) as [string, ...string[]], {
    required_error: 'Category is required',
    invalid_type_error: 'Category must be a string',
  }),
  isPremium: z.boolean().optional(),
  /*  upvote: z.number().optional().default(0),
  downvote: z.number().optional().default(0), */
  userId: z
    .string({
      required_error: 'User id is required',
      invalid_type_error: 'User id must be a string',
    })
    .trim(),
})
