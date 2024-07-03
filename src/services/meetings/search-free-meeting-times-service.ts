import { WorkTimeRepository } from "@/repositories/work-time-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { MeetingsRepository } from "@/repositories/meetings-repository";
import { utcToZonedTime } from "date-fns-tz";
import { isSameDay, isSameHour } from "date-fns";
import moment from "moment-timezone";
import { SquadsRepository } from "@/repositories/squads-repository";

interface GetDayFreeMeetingTimesServiceRequest {
  squad_id: string;
  date: Date;
}


interface AvailableTime {
  available: boolean;
  hour: string;
  id: string;
}

export class GetDayFreeMeetingTimesService {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private squadsRepository: SquadsRepository,
    private workTimeRepository: WorkTimeRepository,
  ) { }

  async execute({
    squad_id,
    date,
  }: GetDayFreeMeetingTimesServiceRequest) {

    // Bring the work_times from all the sellers
    // Bring the meetings from the squad
    // Compare the work_times with the meetings
    // Return the available times
    const squad = await this.squadsRepository.findSquadById(squad_id);

    if (!squad) {
      throw new ResourceNotFoundError();
    }

    const work_times = await this.workTimeRepository.getSquadSellersWorkTime(squad_id);

    const today = utcToZonedTime(new Date(), "America/Sao_Paulo")
    const meetingsForTheDate = await this.meetingsRepository.getMeetingsFromDate(squad_id, date)

    // Filtra apenas os horários de trabalho de vendedores que possuem integrações ativas
    const filteredWorkTimes = work_times.filter(w => w.user.integration.length > 0)

    // Precisa devolver os horarios disponíveis adicionando o work_time.id no availableTime para saber de qual seller é o horário
    const availableTimes = filteredWorkTimes.map((work_time) => {
      return work_time.weekly_hours[date.getDay()].hours.map(({ start_hour, end_hour }) => {
        const parsedStartHour = Number(start_hour.slice(0, 2));
        const parsedStartMinute = Number(start_hour.slice(3, 5));
        const parsedEndHour = Number(end_hour.slice(0, 2));
        const parsedEndMinute = Number(end_hour.slice(3, 5));
        const meetingDuration = squad.meetings_duration * 60; // converte para minutos

        const startTotalMinutes = parsedStartHour * 60 + parsedStartMinute;
        const endTotalMinutes = parsedEndHour * 60 + parsedEndMinute;

        const meetingsTimes = meetingsForTheDate.map((meeting) => {
          const [endHour, endMinute] = meeting.end_time.split(':').map(Number);
          const meetingEnd = moment.tz(meeting.selected_date, 'America/Sao_Paulo').set({ hour: endHour, minute: endMinute }).toDate();

          const [startHour, startMinute] = meeting.selected_time.split(':').map(Number);
          const meetingStart = moment.tz(meeting.selected_date, 'America/Sao_Paulo').set({ hour: startHour, minute: startMinute }).toDate();

          return {
            end: meetingEnd,
            start: meetingStart,
            owner_id: meeting.owner_id
          };
        }) as Array<{ end: Date, start: Date, owner_id: string }>;

        const slots = [];
        for (let minutes = startTotalMinutes; minutes < endTotalMinutes; minutes += meetingDuration) {
          const start = moment.tz(date, 'America/Sao_Paulo').startOf('day').add(minutes, 'minutes').toDate();
          const end = moment(start).add(meetingDuration, 'minutes').toDate();

          const isAfterNow = start.getTime() > today.getTime();
          const isToday = isSameDay(new Date(date), today);

          const hour = `${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')}`;

          const meetingsInTheSameTime = meetingsTimes.filter((meeting) => {
            return start <= meeting.end && end >= meeting.start && work_time.user_id === meeting.owner_id;
          });

          const isAlreadyBooked = meetingsTimes.some((meeting) => {
            return isSameHour(start, meeting.start)
          })

          const isFull = meetingsInTheSameTime.length >= 1

          const isNotAvailable = isAlreadyBooked && isFull

          const available = isToday ? isAfterNow && !isNotAvailable : !isNotAvailable

          slots.push({
            available,
            hour,
            id: work_time.id
          });
        }

        return slots;
      }).flat();
    }).flat();

    const uniqueAvailableTimes = Object.values(availableTimes.reduce((acc, current) => {
      // Se o horário estiver duplicado, remove o que não está disponível
      if (acc[current.hour]) {
        if (current.available) {
          acc[current.hour] = current
        }
      } else {
        acc[current.hour] = current
      }
      return acc
    }, {} as { [key: string]: AvailableTime })
      // Remove os horários duplicados

    ) as AvailableTime[]

    return uniqueAvailableTimes

  }
}