import { Router } from 'express'
import { authRouter } from '../modules/auth/auth.routes'
import { postRouter } from '../modules/post/post.routes'
import { commentRouter } from '../modules/comment/comment.routes'

export const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/posts',
    route: postRouter,
  },
  {
    path: '/comments',
    route: commentRouter,
  },
]

// biome-ignore lint/complexity/noForEach: <explanation>
moduleRoutes.forEach(route => router.use(route.path, route.route))
