import { Response } from 'express'
import { shake } from 'radash'

export function respond(
  res: Response,
  input: {
    data?: unknown
    success: boolean
    statusCode: number
    message?: string
    [key: string]: unknown
  },
) {
  return res.status(input.statusCode).json(
    shake({
      ...input,
    }),
  )
}
