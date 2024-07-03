import { UserTypes } from "@/@types/users";
import { Invite, Prisma, User } from "@prisma/client";

export interface UsersRepository {
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
  update(data: Prisma.UserUpdateInput, user_id: string): Promise<Prisma.UserGetPayload<{ include: { integration: true } }>>;
  createPreRegister(data: UserTypes.PreRegister): Promise<Invite>;
  findOne(filter: Prisma.UserWhereInput): Promise<Prisma.UserGetPayload<{ include: { integration: true } }> | null>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<Prisma.UserGetPayload<{ include: { integration: true } }> | null>;
  findInviteeByEmail(email: string, squad_id: string): Promise<Invite | null>;
  deleteInviteeProfile(id: string): Promise<void>;
}