import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/auth";

export async function authRoutes(app: FastifyInstance) {

  app.get('/auth', verifyJWT)

}