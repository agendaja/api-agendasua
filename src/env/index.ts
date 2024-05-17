import 'dotenv/config'
import { z } from 'zod'


const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
  JWT_SECRET: z.string(),
  MAILER_EMAIL: z.string(),
  MAILER_KEY: z.string(),
<<<<<<< HEAD
  CLIENT_ID: z.string(),
  CLIENT_SECRET: z.string(),
  REDIRECT_URL: z.string(),
  API_KEY: z.string(),
  WEBSITE_URL: z.string(),
  PORT: z.coerce.number().default(3333)
=======
  WEBSITE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
>>>>>>> e9ce8e69f247c818063a99d5d33dca6a06f0d9e9
})


const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables:', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data