import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeResetPasswordService } from "@/services/factories/users/make-reset-password-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function resetPassword(request: FastifyRequest, reply: FastifyReply) {

  const registerBodySchema = z.object({
    password: z.string().min(6),
  })

  const { password } = registerBodySchema.parse(request.body)

  const email = request.user.email

  try {
    const resetPasswordService = makeResetPasswordService()

    await resetPasswordService.execute({
      email,
      password
    })

    return reply.status(200).send()

  } catch (error) {

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }


}