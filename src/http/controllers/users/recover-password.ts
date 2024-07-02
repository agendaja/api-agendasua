import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeRecoverPasswordService } from "@/services/factories/users/make-recover-password-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function recoverPassword(request: FastifyRequest, reply: FastifyReply) {

  const authenticateBodySchema = z.object({
    email: z.string().email(),
  })

  const { email } = authenticateBodySchema.parse(request.body)

  try {
    const recoverPasswordService = makeRecoverPasswordService()

    const token = await reply.jwtSign({
      email,
    }, {
      sign: {
        expiresIn: '1h'
      },
    })
    await recoverPasswordService.execute({
      email,
      token,
    })

    return reply.status(200).send()

  } catch (error) {

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }


}