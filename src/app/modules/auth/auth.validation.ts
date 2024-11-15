import { z } from 'zod'

export const userCreateValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(1)
    .trim(),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email format.' })
    .trim()
    .transform(email => email.toLowerCase()),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(4, { message: 'Password must be at least 4 characters long.' }),
})

export const userLoginValidationSchema = userCreateValidationSchema.pick({
  email: true,
  password: true,
})

export const changePasswordValidationSchema = z.object({
  oldPassword: z.string({
    required_error: 'Old password is required',
  }),
  newPassword: z.string({ required_error: 'New password is required' }),
})

export const forgetPasswordValidationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Please enter a valid email.' }),
})

export const resetPasswordValidationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Please enter a valid email.' }),
  newPassword: z.string({
    required_error: 'User password is required!',
  }),
})

export type TUserCredential = z.infer<typeof userLoginValidationSchema>
