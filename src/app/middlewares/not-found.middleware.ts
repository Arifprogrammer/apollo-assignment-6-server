import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { respond } from '../utils/response.utils'

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  return respond(res, {
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: 'Not Found',
  })
}
