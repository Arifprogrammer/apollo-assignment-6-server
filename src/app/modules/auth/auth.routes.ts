import { Router } from 'express'
import { validateBody } from '../../middlewares/validate-zod.middleware'
import {
  changePassword,
  createUser,
  forgetPassword,
  loginUser,
  resetPassword,
} from './auth.controller'
import {
  changePasswordValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
  userCreateValidationSchema,
  userLoginValidationSchema,
} from './auth.validation'
import { authenticateToken } from '../../middlewares/authenticateToken.middleware'
import { multerUpload } from '../../config/multer.config'
import { parseBody } from '../../middlewares/bodyParser'

const router = Router()

router.post(
  '/register',
  multerUpload.single('image'),
  parseBody,
  validateBody(userCreateValidationSchema),
  createUser,
)
router.post('/login', validateBody(userLoginValidationSchema), loginUser)
router.post(
  '/change-password',
  authenticateToken(),
  validateBody(changePasswordValidationSchema),
  changePassword,
)
router.post(
  '/forget-password',
  validateBody(forgetPasswordValidationSchema),
  forgetPassword,
)
router.post(
  '/reset-password',
  validateBody(resetPasswordValidationSchema),
  resetPassword,
)

export const authRouter = router
