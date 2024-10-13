import { Schema, Types, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        'Please fill a valid email address',
      ],
    },
    followers: {
      type: [Types.ObjectId],
      default: [],
      ref: 'User',
    },
    following: {
      type: [Types.ObjectId],
      default: [],
      ref: 'User',
    },
    favoritePosts: {
      type: [Types.ObjectId],
      default: [],
      ref: 'Post',
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: 4,
    },
    passwordChangedAt: { type: Date },
    role: {
      type: String,
      required: true,
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
)

//* static middleware to check user is already exist or not
userSchema.statics.isUserExist = async email => {
  return await User.findOne({ email })
}

userSchema.statics.userWithoutPassword = async id => {
  return await User.findById({ _id: id }).select('-password')
}

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this

  //* hashing password and save into DB
  user.password = await bcrypt.hash(user.password, Number(config.salt_round))
  next()
})

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password')
}

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000
  return passwordChangedTime > jwtIssuedTimestamp
}

export const User = model<IUser, UserModel>('User', userSchema)
