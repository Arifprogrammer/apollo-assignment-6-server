import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync.utils'
import { respond } from '../../utils/response.utils'
import { PostService } from './post.service'
import AppError from '../../errors/AppError'
import { TImageFiles } from '../../interface/image.interface'

export const getAllPost = catchAsync(async (req, res) => {
  const data = await PostService.getAllPost(req.query)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved all posts successfully',
  })
})

export const getMyPost = catchAsync(async (req, res) => {
  const user = req.user
  const data = await PostService.getMyPost(user.id)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved my posts successfully',
  })
})

export const createPost = catchAsync(async (req, res) => {
  if (!req.files) {
    throw new AppError(400, 'Please upload an image')
  }

  const post = req.body
  const data = await PostService.createPost(post, req.files as TImageFiles)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post created successfully',
  })
})

export const deletePost = catchAsync(async (req, res) => {
  const postId = req.params.id
  await PostService.deletePost(postId)

  respond(res, {
    success: true,
    statusCode: httpStatus.NO_CONTENT,
    message: 'Post deleted successfully',
  })
})

export const updatePost = catchAsync(async (req, res) => {
  const postId = req.params.id
  const updates = req.body
  const data = await PostService.updatePost(postId, updates)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post updated successfully',
  })
})

export const upvotePost = catchAsync(async (req, res) => {
  const postId = req.params.id
  const data = await PostService.upvotePost(postId)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post upvoted successfully',
  })
})

export const downvotePost = catchAsync(async (req, res) => {
  const postId = req.params.id
  const data = await PostService.downvotePost(postId)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post downvoted successfully',
  })
})
