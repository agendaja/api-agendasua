import { oauth2Client } from "@/utils/google/oAuthClietnt";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function googleRedirect(req: FastifyRequest, reply: FastifyReply) {

  const createQuerySchema = z.object({
    code: z.string(),
  })

  const { code } = createQuerySchema.parse(req.query)

  const { tokens } = await oauth2Client.getToken(code)

  oauth2Client.setCredentials(tokens);

  /* Salvar na tabela integrações com os seguintes campos: 
  access_token, 
  refresh_token, 
  scope, 
  token_type,
  expiry_date
*/

  return reply.send(200)
}