import { SquadsRepository } from "@/repositories/squads-repository";
import { endOfWeek, startOfWeek } from "date-fns";
import { WorkTimes } from "@/@types/work-times";
import { getTimeIntervals } from "@/utils/getTimeIntervals";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetSquadAnalyticsServiceRequest {
  squad_id: string;
}

interface GetSquadAnalyticsServiceResponse {
  totalMeetings?: number;
  availableHours?: number;
  allIntervals?: string[];
  squad: {
    id: string;
    name: string;
    theme_color: string | null;
    members: number;
  };
  data?: {
    day: string;
    hours: {
      start: string;
      end: string;
      availableSlots: number,
      occupiedSlots: number
    }[]
  }[]
}
export class GetSquadAnalyticsService {
  constructor(
    private squadsRepository: SquadsRepository,
  ) { }

  async execute({ squad_id }: GetSquadAnalyticsServiceRequest): Promise<GetSquadAnalyticsServiceResponse> {

    const today = new Date()

    const weekStart = startOfWeek(today)
    const weekEnd = endOfWeek(today)

    const squad = await this.squadsRepository.findBySquadIdWithMeetings(squad_id, weekStart, weekEnd)

    if (!squad) {
      throw new ResourceNotFoundError()
    }

    const totalMeetings = squad.meetings.length
    let totalAvailableSlots = 0;


    const allIntervals = new Set<string>()
    // Inicializar a estrutura de dados para os dias da semana
    const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
    const data = weekDays.reduce((acc, day) => {
      acc[day] = {};
      return acc;
    }, {} as any);


    // Processar horários de trabalho
    squad.work_times.forEach(workTime => {
      (workTime.weekly_hours as any)
        .filter((day: WorkTimes.weekly_hours) => day.available)
        .forEach((day: WorkTimes.weekly_hours) => {
          day.hours.forEach(hour => {
            const intervals = getTimeIntervals(hour.start_hour, hour.end_hour, squad.meetings_duration * 60);

            intervals.forEach(({ start, end }) => {
              const timeKey = `${start}-${end}`;
              allIntervals.add(timeKey)
              if (!data[day.name][timeKey]) {
                data[day.name][timeKey] = { availableSlots: 0, occupiedSlots: 0 };
              }
              data[day.name][timeKey].availableSlots += 1;
              totalAvailableSlots += 1
            });
          });
        });
    });

    // Ordenar todos os intervalos e garantir unicidade
    const sortedIntervals = Array.from(allIntervals).sort((a, b) => {
      const [aStart] = a.split('-').map(t => t);
      const [bStart] = b.split('-').map(t => t);
      return aStart.localeCompare(bStart);
    });

    // Adicionar todos os intervalos possíveis aos dados, mesmo que não estejam disponíveis
    weekDays.forEach(day => {
      sortedIntervals.forEach(timeKey => {
        if (!data[day][timeKey]) {
          data[day][timeKey] = { availableSlots: 0, occupiedSlots: 0 };
        }
      });
    });

    // Processa os reuniões para preencher os horários ocupados
    squad.meetings.forEach(meeting => {
      const meetingDay = weekDays[new Date(meeting.selected_date).getDay()];
      const timeKey = `${meeting.selected_time}-${meeting.end_time}`;

      if (!data[meetingDay][timeKey]) {
        data[meetingDay][timeKey] = { availableSlots: 0, occupiedSlots: 0 };
      }
      data[meetingDay][timeKey].occupiedSlots += 1;
    });

    // Formata os dados para o front end
    const formattedData = weekDays.map(day => {
      return {
        day,
        hours: sortedIntervals.map(timeKey => {
          const { availableSlots, occupiedSlots } = data[day][timeKey] || { availableSlots: 0, occupiedSlots: 0 };
          const [start, end] = timeKey.split('-');
          return {
            start,
            end,
            availableSlots,
            occupiedSlots
          };
        })
      };
    });

    const formatedSquad = {
      id: squad.id,
      name: squad.name,
      theme_color: squad.theme_color,
      members: squad._count.squad_member
    }

    return {
      totalMeetings,
      availableHours: totalAvailableSlots,
      allIntervals: Array.from(allIntervals).sort(),
      data: formattedData,
      squad: formatedSquad
    };
  }
}

