import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/auth";
import { getDayFreeTimes } from "./get-day-free-times";
import { create } from "./create";
import { getMeetings } from "./get-meetings";

export async function meetingsRoutes(app: FastifyInstance) {
  app.get('/meetings/:squad_id/:date/free', getDayFreeTimes)

  app.post('/meetings', create)

  app.get('/meetings', { onRequest: [verifyJWT] }, getMeetings)

}