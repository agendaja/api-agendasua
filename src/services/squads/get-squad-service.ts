import { WorkTimeRepository } from "@/repositories/work-time-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { MeetingsRepository } from "@/repositories/meetings-repository";
import { SquadsRepository } from "@/repositories/squads-repository";

interface GetSquadServiceRequest {
  squad_id: string;
}

export class GetSquadService {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private workTimeRepository: WorkTimeRepository,
    private squadsRepository: SquadsRepository,
  ) { }

  async execute({
    squad_id,
  }: GetSquadServiceRequest) {
    // [ ] - Buscar a squad para agendar a reunião
    // [ ] - Buscar o vendedor da squad em questão
    // [ ] - Buscar os horários de trabalho do vendedor e retornar junto com os dados da squad

    const squad = await this.squadsRepository.findSquadById(squad_id);

    if (!squad) {
      throw new ResourceNotFoundError();
    }

    return squad

  }
}