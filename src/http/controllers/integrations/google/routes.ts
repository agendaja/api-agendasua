

import { FastifyInstance } from "fastify";
import { googleConect } from "./conect";
import { googleRedirect } from "./redirect";
import { verifyJWT } from "@/http/middlewares/auth";

export async function googleRoutes(app: FastifyInstance) {

  app.get('/google/redirect', googleRedirect)


  /* Authenticated routes */
  app.get('/google', { onRequest: [verifyJWT] }, googleConect)
}