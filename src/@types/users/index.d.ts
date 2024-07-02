
import { Integration, User } from "@prisma/client";

declare namespace UserTypes {
  export type PreRegister = {
    name: string;
    email: string;
    squad_id: string;
    token: string;
    user_id?: string;
  }
  export type UserIntegration = User & { integration: Integration }

  export type User = {}

}