import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (
  to: string,
  userName: string,
  resetPasswordLink: string,
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: config.SENDER_EMAIL,
      pass: config.SENDER_APP_PASS,
    },
  })
  try {
    await transporter.sendMail({
      from: config.SENDER_EMAIL, // sender address
      to, // list of receivers
      subject: 'Reset your password within ten mins!', // Subject line
      text: '', // plain text body
      html: `<h1>Reset Your Password<h1> \n
  <h5>Hi ${userName},</h5> \n
  <p>Click the link below to set a new password within 5 minutes:</p> \n
  <p><a href="${resetPasswordLink}">Reset Your Password</a></p> \n
  <p>If you did not request a password reset, please ignore this email.</p> \n
  <p>This password reset link will expire in 5 minutes for security reasons. If you miss this window, you can request a new reset link.</p>`,
    })
  } catch (error) {
    console.log(error, 'getting error while sending email')
  }
}
