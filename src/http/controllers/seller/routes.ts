import { FastifyInstance } from "fastify";
import { getSellerSquads } from "./get-user-squads";
import { verifyJWT } from "@/http/middlewares/auth";
import { getSellerWorktime } from "./get-work-time";
import { updateSellerWorktime } from "./update-work-time";


export async function sellerRoutes(app: FastifyInstance) {

  app.addHook('onRequest', verifyJWT)

  app.get('/seller/squads', getSellerSquads)

  app.get('/seller-work-time/:squad_id', getSellerWorktime)
  app.post('/seller-work-time/:squad_id', updateSellerWorktime)
}
