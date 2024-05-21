import { makeGetSellerSquadsService } from "@/services/factories/squads/seller/make-get-seller-squads-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getSellerSquads(request: FastifyRequest, reply: FastifyReply) {

  const seller_id = request.user.sub

  const getSellerSquadsService = makeGetSellerSquadsService()

  const squads = await getSellerSquadsService.execute({ seller_id })

  return reply.status(200).send(squads)
}