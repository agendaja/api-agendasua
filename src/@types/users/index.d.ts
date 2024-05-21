<<<<<<< HEAD
import { Integration, User } from "@prisma/client";

declare namespace UserTypes {
=======
declare namespace Users {
>>>>>>> e9ce8e69f247c818063a99d5d33dca6a06f0d9e9

  export type PreRegister = {
    name: string;
    email: string;
    squad_id: string;
    token: string;
    user_id?: string;
  }
<<<<<<< HEAD

  export type UserIntegration = User & { integration: Integration }

=======
>>>>>>> e9ce8e69f247c818063a99d5d33dca6a06f0d9e9
}