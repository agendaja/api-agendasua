<<<<<<< HEAD
import { User } from "@prisma/client";

=======
>>>>>>> e9ce8e69f247c818063a99d5d33dca6a06f0d9e9
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
<<<<<<< HEAD

  export type IncludeUser = WorkTime & {
    user: User
  }
=======
>>>>>>> e9ce8e69f247c818063a99d5d33dca6a06f0d9e9
}