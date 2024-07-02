
import { makeUpdateUserService } from "@/services/factories/users/make-user-update-service";
import { sanitizeUser } from "@/utils/sanitizeUser";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function udpdateUser(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    document: z.string().optional()
  })

  const { name, phone, document } = registerBodySchema.parse(request.body)

  const user_id = request.user.sub

  const updateUserService = makeUpdateUserService()

  const { user } = await updateUserService.execute({
    name,
    phone,
    document,
    user_id
  })

  const parsedUser = sanitizeUser(user)

  return reply.status(201).send({
    parsedUser
  })
}