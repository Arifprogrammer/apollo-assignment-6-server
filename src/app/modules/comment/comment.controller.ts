import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync.utils'
import { respond } from '../../utils/response.utils'
import { CommentService } from './comment.service'

export const createComment = catchAsync(async (req, res) => {
  const data = await CommentService.createComment(req.body)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Comment created successfully',
  })
})

export const getCommentsByPostId = catchAsync(async (req, res) => {
  const postId = req.params.postId
  const comments = await CommentService.getCommentsByPostId(postId)

  respond(res, {
    data: comments,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comments retrieved successfully',
  })
})

export const updateComment = catchAsync(async (req, res) => {
  const user = req.user
  const commentId = req.params.id
  const updatedComment = await CommentService.updateComment(
    commentId,
    user.id,
    req.body,
  )

  respond(res, {
    data: updatedComment,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment updated successfully',
  })
})

export const deleteComment = catchAsync(async (req, res) => {
  const user = req.user
  const commentId = req.params.id
  await CommentService.deleteComment(commentId, user.id)

  respond(res, {
    success: true,
    statusCode: httpStatus.NO_CONTENT,
    message: 'Comment deleted successfully',
  })
})
