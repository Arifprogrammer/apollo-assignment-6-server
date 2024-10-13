import { NextFunction, Request, Response } from 'express'
import { ZodTypeAny } from 'zod'

export const validateBody = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body)
      next()
    } catch (error) {
      next(error)
    }
  }
}
