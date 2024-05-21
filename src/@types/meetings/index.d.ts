import { Meetings, Squad } from "@prisma/client";

declare namespace MeetingTypes {

  export type Meeting = Meetings;
  // I need to create a type for the meetings that includes the squad
  export type IncludeSquad = Meetings & {
    squad: Squad;
  };

}