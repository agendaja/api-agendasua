import { SquadsRepository } from "@/repositories/squads-repository";
import { endOfWeek, startOfWeek } from "date-fns";
import { WorkTimes } from "@/@types/work-times";

interface GetSquadAnalyticsServiceRequest {
  squad_id: string;
}

interface GetSquadAnalyticsServiceResponse {
  totalMeetings?: number;
  availableHours?: number;
  allIntervals?: string[];
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

    const getTimeIntervals = (start: string, end: string, interval: number) => {
      const startHour = parseInt(start.split(':')[0]);
      const startMinute = parseInt(start.split(':')[1]);
      const endHour = parseInt(end.split(':')[0]);
      const endMinute = parseInt(end.split(':')[1]);

      const intervals = [];
      let currentHour = startHour;
      let currentMinute = startMinute;

      while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
        const nextMinute = (currentMinute + interval) % 60;
        const nextHour = currentHour + Math.floor((currentMinute + interval) / 60);

        intervals.push({
          start: `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`,
          end: `${String(nextHour).padStart(2, '0')}:${String(nextMinute).padStart(2, '0')}`
        });

        currentHour = nextHour;
        currentMinute = nextMinute;
      }

      return intervals;
    };

    const today = new Date()

    const weekStart = startOfWeek(today)
    const weekEnd = endOfWeek(today)

    const squad = await this.squadsRepository.findBySquadIdWithMeetings(squad_id, weekStart, weekEnd)

    if (!squad) {
      return {}
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
          totalAvailableSlots += 1
          day.hours.forEach(hour => {
            const intervals = getTimeIntervals(hour.start_hour, hour.end_hour, squad.meetings_duration * 60);

            intervals.forEach(({ start, end }) => {
              const timeKey = `${start}-${end}`;
              allIntervals.add(timeKey)
              if (!data[day.name][timeKey]) {
                data[day.name][timeKey] = { availableSlots: 0, occupiedSlots: 0 };
              }
              data[day.name][timeKey].availableSlots += 1;
            });
          });
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
        hours: Object.entries(data[day]).map(([timeKey, { availableSlots, occupiedSlots }]) => {
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

    return {
      totalMeetings,
      availableHours: totalAvailableSlots,
      allIntervals: Array.from(allIntervals).sort(),
      data: formattedData
    };
  }
}

