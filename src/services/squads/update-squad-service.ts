import { SquadsRepository } from "@/repositories/squads-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateSquadServiceRequest {
  name?: string;
  description?: string;
  meetings_duration?: number;
  weekly_hours?: {
    name: string;
    available: boolean;
    hours: {
      start_hour: string;
      end_hour: string;
    }[];
  }[];
  theme_color?: string;
  background_color?: string;
  squad_id: string;
}

export class UpdateSquadService {
  constructor(private squadsRepository: SquadsRepository) { }

  async execute({
    name,
    description,
    meetings_duration,
    weekly_hours,
    theme_color,
    background_color,
    squad_id
  }: UpdateSquadServiceRequest) {

    const squad = await this.squadsRepository.findSquadById(squad_id)

    if (!squad) {
      throw new ResourceNotFoundError()
    }


    await this.squadsRepository.update(squad_id, {
      name,
      description,
      meetings_duration,
      weekly_hours,
      theme_color,
      background_color,
    })
  }
}