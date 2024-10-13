import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync.utils'
import { respond } from '../../utils/response.utils'
import { PostService } from './post.service'

export const createPost = catchAsync(async (req, res) => {
  const post = req.body
  const data = await PostService.createPost(post)

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
