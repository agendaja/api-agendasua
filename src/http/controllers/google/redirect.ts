import { makeCreateIntegrationService } from "@/services/factories/make-create-integration-service";
import { oauth2Client } from "@/utils/google/oAuthClietnt";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function googleRedirect(req: FastifyRequest, reply: FastifyReply) {

  const createQuerySchema = z.object({
    code: z.string(),
    state: z.string(),
  })

  const { code, state } = createQuerySchema.parse(req.query)

  const { user_id } = JSON.parse(state)
  const { tokens } = await oauth2Client.getToken(code)

  oauth2Client.setCredentials(tokens);

  const createIntegrationService = makeCreateIntegrationService()

  await createIntegrationService.execute({
    access_token: tokens.access_token || '',
    refresh_token: tokens.refresh_token || '',
    scope: tokens.scope || '',
    token_type: tokens.token_type || '',
    expiry_date: tokens.expiry_date || Number(),
    user_id,
    name: 'google'
  })

  return reply.redirect('http://localhost:3000/integrations')

}