import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { makeAddSquadMemberService } from "@/services/factories/make-add-squad-member";
import { makeDeleteInviteePorfileService } from "@/services/factories/make-delete-invitee-profile-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function addSquadMember(request: FastifyRequest, reply: FastifyReply) {

  const createSquadBodySchema = z.object({
    squad_id: z.string(),
    email: z.string().email(),
    invitee_id: z.string(),
  })

  const {
    squad_id,
    email,
    invitee_id
  } = createSquadBodySchema.parse(request.body)


  const addSquadMember = makeAddSquadMemberService()

  const deleteInviteeProfile = makeDeleteInviteePorfileService()

  try {
    await addSquadMember.execute({
      email,
      squad_id,
    })

    await deleteInviteeProfile.execute({
      id: invitee_id,
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