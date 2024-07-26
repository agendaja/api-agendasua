import { SquadsRepository } from "@/repositories/squads-repository";
import { addDays, startOfWeek } from "date-fns";
import { MeetingsRepository } from "@/repositories/meetings-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { MeetingTypes } from "@/@types/meetings";
import moment from "moment-timezone";

interface GetSquadMeetingsByTimeRangeServiceRequest {
  squad_id: string;
  weekDay: "SEG" | "TER" | "QUA" | "QUI" | "SEX" | "SAB" | "DOM";
  startTime: string;
  endTime: string;
}

interface GetSquadMeetingsByTimeRangeServiceResponse {
  id: string;
  name: string;
  email: string;
  meetings: MeetingTypes.IncludeOwner[];
}

export class GetSquadMeetingsByTimeRangeService {
  constructor(
    private squadsRepository: SquadsRepository,
    private meetingsRepository: MeetingsRepository
  ) { }

  async execute({
    squad_id,
    weekDay,
    startTime,
    endTime
  }: GetSquadMeetingsByTimeRangeServiceRequest): Promise<GetSquadMeetingsByTimeRangeServiceResponse[]> {

    const squad = await this.squadsRepository.findSquadById(squad_id);

    if (!squad) {
      throw new ResourceNotFoundError();
    }

    const today = new Date();

    // Define a correspondência dos dias da semana
    const weekDayMapping: { [key: string]: number } = {
      'DOM': 0,
      'SEG': 1,
      'TER': 2,
      'QUA': 3,
      'QUI': 4,
      'SEX': 5,
      'SAB': 6,
    };

    // Define as horas e minutos
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    // Obtém a data do início da semana e ajusta para o dia correto da semana já com o horário de início
    const targetDateStart = moment.tz(addDays(startOfWeek(today), weekDayMapping[weekDay]), 'America/Sao_Paulo')
      .set({ hour: startHour, minute: startMinute }).toDate();

    const targetDateEnd = moment.tz(addDays(startOfWeek(today), weekDayMapping[weekDay]), 'America/Sao_Paulo')
      .set({ hour: endHour, minute: endMinute }).toDate();

    // Converte targetDate para o fuso horário correto e ajusta as horas
    const startDateTime = moment(targetDateStart).utc(true).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const endDateTime = moment(targetDateEnd).utc(true).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    // TODO: Remover este console. É somente para testar o timezone em produção
    console.log('Meetings By Time Range startDate', startDateTime);
    console.log('Meetings By Time Range endDate', endDateTime);

    const meetings = await this.meetingsRepository.findMeetingsByDateTimeRange(squad_id, startDateTime, endDateTime);

    const result = meetings.map(meeting => {
      return {
        id: meeting.owner.id,
        name: meeting.owner.name,
        email: meeting.owner.email,
        meetings: meetings.filter(m => m.owner_id === meeting.owner.id)
      };
    });

    // Remove duplicatas do array resultante
    const uniqueResult = Array.from(new Map(result.map(item => [item.id, item])).values());

    return uniqueResult;
  }
}
