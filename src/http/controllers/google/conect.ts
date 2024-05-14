import { oauth2Client } from "@/utils/google/oAuthClietnt";
import { FastifyReply, FastifyRequest } from "fastify";


export async function googleConect(req: FastifyRequest, reply: FastifyReply) {
  const scopes = ['https://www.googleapis.com/auth/calendar'];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  return reply.redirect(url)
}