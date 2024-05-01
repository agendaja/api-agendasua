import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/auth";
import { getAuthUser } from ".";

export async function authRoutes(app: FastifyInstance) {

  app.get('/auth', verifyJWT)

  app.get('/auth-user', { onRequest: [verifyJWT] }, getAuthUser)

}