import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { makeInviteSellerToSquadService } from "@/services/factories/make-invite-seller-to-squad-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function inviteSellerToSquad(request: FastifyRequest, reply: FastifyReply) {

  const createParamsSchema = z.object({
    squad_id: z.string(),
  })

  const createSquadBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
  })

  const {
    squad_id
  } = createParamsSchema.parse(request.params)

  const {
    name,
    email,
  } = createSquadBodySchema.parse(request.body)


  const inviteSellerToSquadService = makeInviteSellerToSquadService()


  try {
    const token = await reply.jwtSign({
      email,
      squad_id
    }, {})

    await inviteSellerToSquadService.execute({
      name,
      email,
      squad_id,
      token
    })

    return reply.status(201).send({})

  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }

}