import { makeGetSquadService } from "@/services/factories/squads/make-get-squad-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getSquad(request: FastifyRequest, reply: FastifyReply) {

  const createParamsSchema = z.object({
    squad_id: z.string(),
  })

  const { squad_id } = createParamsSchema.parse(request.params)

  const getSquadService = makeGetSquadService()


  const squad = await getSquadService.execute({ squad_id })


  return reply.status(200).send(squad)
}