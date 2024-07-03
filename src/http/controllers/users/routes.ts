import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./athenticate";
import { verifyJWT } from "../../middlewares/auth";
import { profile } from "./profile";
import { getInviteProfile } from "./get-invitee-profile";
import { udpdateUser } from "./update";
import { recoverPassword } from "./recover-password";
import { resetPassword } from "./reset-password";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.post('/recover-password', recoverPassword)

  /* Authenticated routes */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
  app.put('/users', { onRequest: [verifyJWT] }, udpdateUser)
  app.get('/invite', { onRequest: [verifyJWT] }, getInviteProfile)
  app.put('/reset-password', { onRequest: [verifyJWT] }, resetPassword)
}