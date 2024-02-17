import { SquadsRepository } from "@/repositories/squads-repository";

interface CreateSquadServiceRequest {
  name: string;
  description: string;
  meetings_duration: number;
  weekly_hours: {
    name: string;
    available: boolean;
    hours: {
      start_hour: string;
      end_hour: string;
    }[];
  }[];
  theme_color: string | null;
  background_color: string | null;
  user_id: string;
}

export class CreateSquadService {
  constructor(private squadsRepository: SquadsRepository) { }

  async execute({
    name,
    description,
    meetings_duration,
    weekly_hours,
    theme_color,
    background_color,
    user_id,
  }: CreateSquadServiceRequest) {

    const parsedMeeetingsDuration = meetings_duration / 60;

    await this.squadsRepository.create({
      name,
      description,
      meetings_duration: parsedMeeetingsDuration,
      weekly_hours,
      theme_color,
      background_color,
      user_id,
    })
  }
}