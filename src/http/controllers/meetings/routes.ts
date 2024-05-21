import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/auth";
import { getDayFreeTimes } from "./get-day-free-times";
import { create } from "./create";

export async function meetingsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/meetings', create)

}

export async function meetingsFreeRoutes(app: FastifyInstance) {
  app.get('/meetings/:squad_id/:date/free', getDayFreeTimes)
}