import { NextFunction, Request, Response } from 'express'
import { TErrorMessages } from '../interface/error'
import config from '../config'
import { ZodError } from 'zod'
import handleZodError from '../errors/handleZodError'
import handleValidationError from '../errors/handleValidationError'
import handleDuplicateError from '../errors/handleDuplicateError'
import handleCastError from '../errors/handleCastError'
import AppError from '../errors/AppError'
import { deleteImagesFromCloudinary } from '../utils/deleteImage'
import { TImageFile, TImageFiles } from '../interface/image.interface'

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //* default values
  let statusCode = 500
  let message = 'Something went wrong!'
  let errorMessages: TErrorMessages[] = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ]

  if (req.files && Object.keys(req.files).length > 0) {
    await deleteImagesFromCloudinary(req.files as TImageFiles)
  }

  if (req.file) await deleteImagesFromCloudinary(req.file as TImageFile)

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessages = simplifiedError?.errorMessages
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessages = simplifiedError?.errorMessages
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessages = simplifiedError?.errorMessages
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessages = simplifiedError?.errorMessages
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err.message
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ]
  } else if (err instanceof Error) {
    message = err.message
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }

  //* ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  })
}
