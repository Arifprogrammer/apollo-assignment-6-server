import { Router } from 'express'
import { authenticateToken } from '../../middlewares/authenticateToken.middleware'
import { validateBody } from '../../middlewares/validate-zod.middleware'
import { favoritePostSchema, followingSchema } from '../user/user.validation'
import { followUser, getMe, makePostFavorite } from './user.controller'

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
