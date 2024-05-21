import { FastifyInstance } from "fastify";
import { getDayFreeTimes } from "./get-day-free-times";
import { create } from "./create";



export async function meetingsFreeRoutes(app: FastifyInstance) {
  app.get('/meetings/:squad_id/:date/free', getDayFreeTimes)

  app.post('/meetings', create)

}