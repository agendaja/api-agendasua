import { FastifyInstance } from "fastify";
import { getSellerSquads } from "./get-user-squads";
import { verifyJWT } from "@/http/middlewares/auth";


export async function sellerRoutes(app: FastifyInstance) {

  app.addHook('onRequest', verifyJWT)

  app.get('/seller/squads', getSellerSquads)
}
