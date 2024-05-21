import { UserTypes } from "@/@types/users";
import { Invite, Prisma, User } from "@prisma/client";

export interface UsersRepository {
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
  createPreRegister(data: UserTypes.PreRegister): Promise<Invite>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<Prisma.UserGetPayload<{ include: { integration: true } }> | null>;
  findInviteeByEmail(email: string, squad_id: string): Promise<Invite | null>;
  deleteInviteeProfile(id: string): Promise<void>;
}