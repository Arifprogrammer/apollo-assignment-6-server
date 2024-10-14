import { Router } from 'express'
import { validateBody } from '../../middlewares/validate-zod.middleware'
import { authenticateToken } from '../../middlewares/authenticateToken.middleware'
import {
  createComment,
  deleteComment,
  getCommentsByPostId,
  updateComment,
} from './comment.controller'
import {
  commentCreateValidationSchema,
  commentUpdateValidationSchema,
} from './comment.validation'

const router = Router()

router.get('/:postId', authenticateToken(), getCommentsByPostId)
router.post(
  '/create',
  authenticateToken(),
  validateBody(commentCreateValidationSchema),
  createComment,
)
router.put(
  '/update/:id',
  authenticateToken(),
  validateBody(commentUpdateValidationSchema),
  updateComment,
)
router.delete('/delete/:id', authenticateToken(), deleteComment)

export const authRouter = router
