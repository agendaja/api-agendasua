import { Invite, Prisma, User } from "@prisma/client";

export interface UsersRepository {
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
  createPreRegister(data: Users.PreRegister): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findInviteeByEmail(email: string, squad_id: string): Promise<Invite | null>;
  deleteInviteeProfile(id: string): Promise<void>;
}