import { Router } from 'express'
import { authenticateToken } from '../../middlewares/authenticateToken.middleware'
import { validateBody } from '../../middlewares/validate-zod.middleware'
import {
  favoritePostSchema,
  followingSchema,
  updateUserSchema,
} from '../user/user.validation'
import { followUser, getMe, makePostFavorite, update } from './user.controller'
import { parseBody } from '../../middlewares/bodyParser'
import { multerUpload } from '../../config/multer.config'

const router = Router()

router.post(
  '/following',
  authenticateToken(),
  validateBody(followingSchema),
  followUser,
)
router.post(
  '/favorite-post',
  authenticateToken(),
  validateBody(favoritePostSchema),
  makePostFavorite,
)

router.get('/get-me', authenticateToken(), getMe)

router.put(
  '/:id',
  authenticateToken(),
  multerUpload.single('image'),
  parseBody,
  validateBody(updateUserSchema),
  update,
)

export const userRouter = router
