import fastify from 'fastify';
import { usersRoutes } from './http/controllers/users/routes';
import { ZodError } from 'zod';
import { env } from './env';
import { fastifyJwt } from '@fastify/jwt';
import { squadsRoutes } from './http/controllers/squads/routes';
import { meetingsRoutes } from './http/controllers/meetings/routes';
import cors from '@fastify/cors'
import { authRoutes } from './http/controllers/auth/routes';
import { healthRoutes } from './http/controllers/routes';
import { googleRoutes } from './http/controllers/integrations/google/routes';
import { sellerRoutes } from './http/controllers/seller/routes';
import { integrationRoutes } from './http/controllers/integrations/routes';
import { dashboardRoutes } from './http/controllers/dashboard/route';

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d',
  }
})

app.register(cors, {
  origin: ['https://agendasua.com.br', 'https://www.agendasua.com.br'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
})


app.register(healthRoutes) // This is the health check route

app.register(usersRoutes)
app.register(squadsRoutes)
app.register(meetingsRoutes)
app.register(authRoutes)
app.register(googleRoutes)
app.register(sellerRoutes)
app.register(integrationRoutes)
app.register(dashboardRoutes)


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