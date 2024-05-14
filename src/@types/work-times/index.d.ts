import { User } from "@prisma/client";

declare namespace WorkTimes {

  export type weekly_hours = {
    name: string;
    available: boolean;
    hours: {
      start_hour: string;
      end_hour: string;
    }[];
  }[];

  export type WorkTime = {
    id: string;
    user_id: string;
    squad_id: string;
    weekly_hours: weekly_hours;
    created_at: Date;
    updated_at: Date;
  }

  export type IncludeUser = WorkTime & {
    user: User
  }
}