import { ObjectId } from 'mongoose'
import { User } from './user.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

class Service {
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

  async getMe(userId: ObjectId) {
    return await User.findById({ id: userId })
  }
}

export const UserService = new Service()
