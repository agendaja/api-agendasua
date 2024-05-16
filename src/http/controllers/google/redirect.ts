import { env } from "@/env";
import { makeCreateIntegrationService } from "@/services/factories/make-create-integration-service";
import { oauth2Client } from "@/utils/google/oAuthClietnt";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function googleRedirect(req: FastifyRequest, reply: FastifyReply) {

  const createQuerySchema = z.object({
    code: z.string()
  })

  const { code } = createQuerySchema.parse(req.query)

  const { tokens } = await oauth2Client.getToken(code)

  oauth2Client.setCredentials(tokens);

  // Pega o email do usuário autenticado
  const ticket = await oauth2Client.verifyIdToken({
    idToken: tokens.id_token || '',
    audience: env.CLIENT_ID
  })

  const payload = ticket.getPayload()

  const createIntegrationService = makeCreateIntegrationService()

  await createIntegrationService.execute({
    access_token: tokens.access_token || '',
    refresh_token: tokens.refresh_token || '',
    scope: tokens.scope || '',
    token_type: tokens.token_type || '',
    expiry_date: tokens.expiry_date || Number(),
    email: payload?.email || '',
    name: 'google'
  })

  return reply.redirect('http://localhost:3000/integrations')

}