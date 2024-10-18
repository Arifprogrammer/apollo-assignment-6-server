import { Router } from 'express'
import { validateBody } from '../../middlewares/validate-zod.middleware'
import { authenticateToken } from '../../middlewares/authenticateToken.middleware'
import { multerUpload } from '../../config/multer.config'
import { parseBody } from '../../middlewares/bodyParser'
import {
  createPost,
  deletePost,
  downvotePost,
  getAllPost,
  getMyPost,
  updatePost,
  upvotePost,
} from './post.controller'
import {
  postCreateValidationSchema,
  postUpdateValidationSchema,
} from './post.validation'
import validateImageFileRequest from '../../middlewares/validateImageFileRequest'
import { ImageFilesArrayZodSchema } from '../../zod/image.validation'

const router = Router()

router.get('/', authenticateToken(), getAllPost)
router.get('/my-post', authenticateToken(), getMyPost)
router.patch('/upvote/:id', authenticateToken(), upvotePost)
router.patch('/downvote/:id', authenticateToken(), downvotePost)
router.post(
  '/create',
  authenticateToken(),
  multerUpload.fields([{ name: 'images' }]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateBody(postCreateValidationSchema),
  createPost,
)
router.delete('/delete/:id', authenticateToken(), deletePost)
router.put(
  '/update/:id',
  authenticateToken(),
  validateBody(postUpdateValidationSchema),
  updatePost,
)

export const postRouter = router
