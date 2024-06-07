

import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/auth";
import { deleteIntegration } from "./delete-integration";
import { getIntegration } from "./get-integration";

export async function integrationRoutes(app: FastifyInstance) {

  app.get('/integration', { onRequest: [verifyJWT] }, getIntegration)
  app.delete('/integration/:integration_id', { onRequest: [verifyJWT] }, deleteIntegration)

}