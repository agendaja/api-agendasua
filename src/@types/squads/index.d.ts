import { Squad, User } from "@prisma/client";

declare namespace SquadTypes {

  // I need to create a type for the meetings that includes the squad
  export type IncludeUser = Squad & {
    user: User;
  };

}