import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./athenticate";
import { verifyJWT } from "../../middlewares/auth";
import { profile } from "./profile";
import { getInviteProfile } from "./get-invitee-profile";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /* Authenticated routes */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
  app.get('/invite', { onRequest: [verifyJWT] }, getInviteProfile)
}