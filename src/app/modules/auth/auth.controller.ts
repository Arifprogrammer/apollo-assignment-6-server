import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync.utils'
import { respond } from '../../utils/response.utils'
import { AuthService } from './auth.service'
import AppError from '../../errors/AppError'
import { TImageFile } from '../../interface/image.interface'

export const createUser = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new AppError(400, 'Please upload an image')
  }

  const user = req.body
  const data = await AuthService.createUser(user, req.file as TImageFile)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
  })
})

export const loginUser = catchAsync(async (req, res) => {
  const credentials = req.body
  const { userWithOutPass, token } = await AuthService.loginUser(credentials)

  respond(res, {
    data: userWithOutPass,
    token,
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
  })
})

export const changePassword = catchAsync(async (req, res) => {
  const data = await AuthService.changePassword(req.user, req.body)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password is updated successfully!',
  })
})

export const forgetPassword = catchAsync(async (req, res) => {
  const data = await AuthService.forgetPassword(req.body.email)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reset link is generated successfully!',
  })
})

export const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1] as string

  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong !')
  }

  const data = await AuthService.resetPassword(req.body, token)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password reset successfully!',
  })
})
