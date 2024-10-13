import dotenv from 'dotenv'
import path from 'node:path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  database_url: process.env.MONGODB_URL,
  salt_round: process.env.BCRYPT_SALT_ROUND,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  Access_Token_Expiration: process.env.ACCESS_TOKEN_EXPIRATION,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  SENDER_EMAIL: process.env.SENDER_EMAIL,
  SENDER_APP_PASS: process.env.SENDER_APP_PASS,
} as Record<string, string>
