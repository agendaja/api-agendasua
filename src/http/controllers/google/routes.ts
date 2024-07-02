

import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/auth";
import { googleConect } from "./conect";
import { googleRedirect } from "./redirect";

export async function googleRoutes(app: FastifyInstance) {

  app.get('/google/redirect', googleRedirect)


  /* Authenticated routes */
  app.get('/google', { onRequest: [verifyJWT] }, googleConect)
}