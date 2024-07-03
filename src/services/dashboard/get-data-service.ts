import { SquadsRepository } from "@/repositories/squads-repository";
import { endOfWeek, startOfWeek } from "date-fns";
import { WorkTimes } from "@/@types/work-times";
import { getTimeIntervals } from "@/utils/getTimeIntervals";

interface GetDashboardDataServiceRequest {
  user_id: string;
}

type RankingSquads = {
  id: string;
  name: string;
  theme_color: string | null;
  ranking: number;
}

interface GetDashboardDataServiceResponse {
  totalMeetings: number;
  availableHours: number;
  rankingSquads: RankingSquads[];
}

export class GetDashboardDataService {
  constructor(
    private squadsRepository: SquadsRepository,
  ) { }

  async execute({ user_id }: GetDashboardDataServiceRequest): Promise<GetDashboardDataServiceResponse> {

    const today = new Date()

    const weekStart = startOfWeek(today)
    const weekEnd = endOfWeek(today)

    const squads = await this.squadsRepository.findSquadsByUserIdWithMeetings(user_id, weekStart, weekEnd)

    let totalMeetings = 0;
    let totalAvailableSlots = 0;

    let rankingSquads = [] as RankingSquads[];
    // Processar cada squad
    squads.forEach(squad => {
      // Contar reuniões marcadas
      totalMeetings += squad.meetings.length;

      const rankingSquad = {
        id: squad.id,
        name: squad.name,
        theme_color: squad.theme_color,
        ranking: squad.meetings.length
      }
      rankingSquads.push(rankingSquad)
      // Processar horários de trabalho
      squad.work_times.forEach(workTime => {
        (workTime.weekly_hours as any)
          .filter((day: WorkTimes.weekly_hours) => day.available)
          .forEach((day: WorkTimes.weekly_hours) => {
            day.hours.forEach(hour => {
              const intervals = getTimeIntervals(hour.start_hour, hour.end_hour, squad.meetings_duration * 60);

              totalAvailableSlots += intervals.length
            })

          });
      });

    })

    return {
      totalMeetings,
      availableHours: totalAvailableSlots,
      rankingSquads
    };
  }
}
