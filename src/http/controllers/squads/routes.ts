import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/auth";
import { create } from "./create";
import { inviteSellerToSquad } from "./invite-seller-to-squad";
import { getSquad } from "./get-squad";
import { getUserSquads } from "./get-user-squads";
import { addNewUserToSquad } from "./add-new-user-to-squad-member";
import { addSquadMember } from "./add-squad-member";
import { update } from "./update";

export async function squadsRoutes(app: FastifyInstance) {

  app.get('/squad/:squad_id', getSquad)

  app.post('/squad/new-user', addNewUserToSquad)

  app.post('/squad/new-member', addSquadMember)


  app.post('/squad', { onRequest: [verifyJWT] }, create)

  app.post('/squad/:squad_id/seller', { onRequest: [verifyJWT] }, inviteSellerToSquad)

  app.put('/squad/:squad_id', { onRequest: [verifyJWT] }, update)

  app.get('/squads', { onRequest: [verifyJWT] }, getUserSquads)
}
