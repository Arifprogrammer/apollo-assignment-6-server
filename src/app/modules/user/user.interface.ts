import { Model, ObjectId } from 'mongoose'

export interface IUser {
  id?: ObjectId
  name: string
  email: string
  followers: ObjectId[]
  following: ObjectId[]
  favoritePosts: ObjectId[]
  password: string
  profilePhoto: string
  passwordChangedAt?: Date
  role: 'user' | 'admin'
  isVerified: boolean
  isDeleted: boolean
}

export interface UserModel extends Model<IUser> {
  isUserExist(email: string): Promise<IUser | null>
  userWithoutPassword(id: ObjectId): Promise<IUser | null>
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean
}
