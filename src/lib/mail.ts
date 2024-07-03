import nodemailer from 'nodemailer'
import { env } from '@/env';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: env.MAILER_EMAIL,
    pass: env.MAILER_KEY
  }
})