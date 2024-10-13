import { Router } from 'express'
/* import { validateBody } from '../../middlewares/validate-zod.middleware'
import { authenticateToken } from '../../middlewares/authenticateToken.middleware'
import { multerUpload } from '../../config/multer.config'
import { parseBody } from '../../middlewares/bodyParser' */

const router = Router()

/* router.post(
  '/register',
  multerUpload.single('image'),
  parseBody,
  validateBody(userCreateValidationSchema),
  createUser,
)
router.post('/login', validateBody(userLoginValidationSchema), loginUser) */

export const authRouter = router
