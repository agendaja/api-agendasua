import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { makeRegisterService } from "@/services/factories/make-register-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {

  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().min(10).max(14),
    admin: z.boolean().optional(),
    document: z.string(),
  })

  const { name, email, password, phone, document, admin } = registerBodySchema.parse(request.body)

  try {
    const registerService = makeRegisterService()

    await registerService.execute({
      name,
      email,
      password,
      phone,
      admin,
      document
    })
  } catch (error) {

    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}