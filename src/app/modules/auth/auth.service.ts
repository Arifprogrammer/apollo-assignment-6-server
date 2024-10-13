import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import bcrypt from 'bcrypt'
import { IUser } from '../user/user.interface'
import { User } from '../user/user.model'
import { TUserCredential } from './auth.validation'
import { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import config from '../../config'
import { ObjectId } from 'mongoose'
import { shake } from 'radash'
import { sendEmail } from '../../utils/sendEmail'

class Service {
  async createUser(user: IUser) {
    if (await User.isUserExist(user.email)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'The user is already exist')
    }

    const newUser = await User.create(user)
    const userWithOutPass = await User.userWithoutPassword(newUser.id)

    return userWithOutPass
  }

  async loginUser(credentials: TUserCredential) {
    const existingUser = await User.isUserExist(credentials.email)

    if (!existingUser) {
      throw new AppError(httpStatus.BAD_REQUEST, `The user doesn't exist`)
    }

    const passwordMatch = await bcrypt.compare(
      credentials.password,
      existingUser.password,
    )

    if (!passwordMatch) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect Password')
    }

    const token = this.createToken(
      existingUser.email,
      existingUser.role,
      existingUser.name,
      existingUser.id!,
    )
    const userWithOutPass = await User.userWithoutPassword(
      existingUser.id as ObjectId,
    )

    return { userWithOutPass, token }
  }

  async changePassword(
    userData: JwtPayload,
    payload: { oldPassword: string; newPassword: string },
  ) {
    // checking if the user is exist
    const user = await User.isUserExist(userData.email)

    //checking if the password is correct
    if (
      !(await User.isPasswordMatched(
        payload.oldPassword,
        user?.password as string,
      ))
    )
      throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')

    //hash new password
    const newHashedPassword = await bcrypt.hash(
      payload.newPassword,
      Number(config.bcrypt_salt_rounds),
    )

    await User.findOneAndUpdate(
      {
        id: userData.userId,
        role: userData.role,
      },
      {
        password: newHashedPassword,
        passwordChangedAt: new Date(),
      },
    )

    return null
  }

  async forgetPassword(email: string) {
    // checking if the user is exist
    const user = await User.isUserExist(email)

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
    }

    /* const jwtPayload = {
      email: email,
      role: user.role,
    } */

    const resetToken = this.createToken(email, user.role, user.name)

    const resetPasswordLink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken} `

    console.log(resetPasswordLink)
    sendEmail(user.email, user.name, resetPasswordLink)
  }

  async resetPassword(
    payload: { email: string; newPassword: string },
    token: string,
  ) {
    const { email, role } = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload

    if (payload.email !== email) {
      // console.log(payload.id, userId);
      throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!')
    }

    //hash new password
    const newHashedPassword = await bcrypt.hash(
      payload.newPassword,
      Number(config.bcrypt_salt_rounds),
    )

    await User.findOneAndUpdate(
      {
        email: email,
        role: role,
      },
      {
        password: newHashedPassword,
        passwordChangedAt: new Date(),
      },
    )
  }

  async followUser(followingUserId: ObjectId, userId: ObjectId) {
    const isFollowingUserExist = await User.findById({ id: followingUserId })

    if (!isFollowingUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, `The user doesn't exist`)
    }

    const updateFollowingUser = await User.findOneAndUpdate(
      {
        id: followingUserId,
      },
      {
        $push: { followers: userId },
      },
      { new: true },
    )

    const updateUser = await User.findOneAndUpdate(
      {
        id: userId,
      },
      {
        $push: { following: followingUserId },
      },
      { new: true },
    )

    return {
      followersOfFollowingUser: updateFollowingUser?.followers.length,
      following: updateUser?.following.includes(followingUserId),
    }
  }

  async makePostFavorite(postId: ObjectId, userId: ObjectId) {
    return await User.findOneAndUpdate(
      {
        id: userId,
      },
      {
        $push: { favoritePosts: postId },
      },
      { new: true },
    )
  }

  private createToken(
    email: string,
    role: string,
    name: string,
    id?: ObjectId,
  ) {
    const payload: JwtPayload = {
      email,
      role,
      id,
      name,
    }

    return jwt.sign(shake(payload), config.JWT_SECRET, {
      expiresIn: id ? config.Access_Token_Expiration : '5m',
    })
  }
}

export const AuthService = new Service()