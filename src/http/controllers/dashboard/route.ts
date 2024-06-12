import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/auth";

import { getDashboardData } from "./get-data";
import { getSquadAnalytics } from "./get-squad-analytics";

export async function dashboardRoutes(app: FastifyInstance) {

  /* Authenticated routes */
  app.get('/dashboard', { onRequest: [verifyJWT] }, getDashboardData)

  app.get('/dashboard/:squad_id', { onRequest: [verifyJWT] }, getSquadAnalytics)

}