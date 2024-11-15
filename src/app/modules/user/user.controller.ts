import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync.utils'
import { respond } from '../../utils/response.utils'
import { UserService } from './user.service'

export const followUser = catchAsync(async (req, res) => {
  const user = req.user
  const { followingUserId } = req.body
  const data = await UserService.followUser(followingUserId, user.id)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Following user successfully',
  })
})

export const makePostFavorite = catchAsync(async (req, res) => {
  const user = req.user
  const { postId } = req.body
  const data = await UserService.makePostFavorite(postId, user.id)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Following user successfully',
  })
})

export const getMe = catchAsync(async (req, res) => {
  const user = req.user
  const data = await UserService.getMe(user.id)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Get me successfully',
  })
})
