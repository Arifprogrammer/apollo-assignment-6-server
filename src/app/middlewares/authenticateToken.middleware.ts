import { RequestHandler } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import { User } from '../modules/user/user.model'

export const authenticateToken = (...roles: string[]): RequestHandler => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] as string

    jwt.verify(token, config.JWT_SECRET, async function (err, decoded) {
      if (err)
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You have no access to this route',
        )
      const { email, iat } = decoded as JwtPayload

      // checking if the user is exist
      const user = await User.isUserExist(email)

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
      }

      // checking if the user is already deleted
      if (user?.isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
      }

      if (
        user.passwordChangedAt &&
        User.isJWTIssuedBeforePasswordChanged(
          user.passwordChangedAt,
          iat as number,
        )
      ) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
      }

      if (roles.length && !roles.includes(user.role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You have no access to this route',
        )
      }

      req.user = user

      next()
    })
  }
}
