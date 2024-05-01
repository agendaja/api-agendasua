import fastify from 'fastify';
import { usersRoutes } from './http/controllers/users/routes';
import { ZodError } from 'zod';
import { env } from './env';
import { fastifyJwt } from '@fastify/jwt';
import { squadFreeRoutes, squadsRoutes } from './http/controllers/squads/routes';
import { meetingsFreeRoutes, meetingsRoutes } from './http/controllers/meetings/routes';
import cors from '@fastify/cors'
import { authRoutes } from './http/controllers/auth/routes';
import { healthRoutes } from './http/controllers/routes';

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d',
  }
})

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],

})

app.register(healthRoutes) // This is the health check route

app.register(usersRoutes)
app.register(squadsRoutes)
app.register(squadFreeRoutes)
app.register(meetingsRoutes)
app.register(meetingsFreeRoutes)
app.register(authRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error', error: error.format() })
  }

  if (env.NODE_ENV !== 'prod') {
    console.log(error)
  } else {
    // Use a external tool to log errors in production
  }

  return reply.status(500).send({ message: 'Internal server error' })
})