import { WorkTimeRepository } from "@/repositories/work-time-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { MeetingsRepository } from "@/repositories/meetings-repository";
import { utcToZonedTime } from "date-fns-tz";
import { isSameDay, isSameHour, setHours, setMinutes } from "date-fns";
import moment from "moment-timezone";

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
    const work_time = await this.workTimeRepository.getSquadSellersWorkTime(squad_id);

    if (!work_time) {
      throw new ResourceNotFoundError();
    }

    const today = utcToZonedTime(new Date(), "America/Sao_Paulo")
    const meetingsForTheDate = await this.meetingsRepository.getMeetingsFromDate(squad_id, date)

    // Filtra apenas os horários de trabalho de vendedores que possuem integrações ativas
    const filteredWorkTimes = work_time.filter(w => w.user.integration.length > 0)

    // Precisa devolver os horarios disponíveis adicionando o work_time.id no availableTime para saber de qual seller é o horário
    const availableTimes = filteredWorkTimes.map((work_time) => {
      return work_time.weekly_hours[date.getDay()].hours.map(({ start_hour, end_hour }) => {
        const parsedStartHour = Number(start_hour.slice(0, 2)) // 09:00 -> 9
        const parsedEndHour = Number(end_hour.slice(0, 2)) // 18:00 -> 18

        const meetingsTimes = meetingsForTheDate.map((meeting) => {

          const [hours, minute] = meeting.end_time.split(':').map(Number)

          const meetingEnd = moment.tz(meeting.selected_date, 'America/Sao_Paulo').utcOffset(0).set({ hours, minute }).toDate()

          // TODO: If the Minimum advance time for appointments were implemented, it has to add the minutes to the meetingEnd
          return {
            end: meetingEnd,
            start: meeting.selected_date,
            owner_id: meeting.owner_id
          }
        }) as Array<{ end: Date, start: Date, owner_id: string }> // Formata os horários dos meetings já marcados

        const hoursIsSplitInHowManyParts = 60 / 60 // Aqui adiciona os incrementos de horário de inicio, caso tenha

        return Array.from(
          {
            length: ((parsedEndHour - parsedStartHour) + 1) * hoursIsSplitInHowManyParts
          },
          (_, index) => {
            const offset = Number(parsedStartHour) + Math.floor(index / hoursIsSplitInHowManyParts)
            const minutesOffset = index % hoursIsSplitInHowManyParts
            const start = setMinutes(setHours(new Date(date), offset - 3), minutesOffset)

            const isAfterNow = offset > today.getHours()
            const isToday = isSameDay(new Date(date), today)
            const hour = `${offset.toString().padStart(2, "0")}:${minutesOffset.toString().padStart(2, "0")}`

            const meetingsInTheSameTime = meetingsTimes.filter((meeting) => {
              return start >= meeting.start && start <= meeting.end && work_time.user_id === meeting.owner_id
            })

            const isAlreadyBooked = meetingsTimes.some((meeting) => {
              return isSameHour(start, meeting.start)
            })

            const isFull = meetingsInTheSameTime.length >= 1

            const isNotAvailable = isAlreadyBooked && isFull

            const available = isToday ? isAfterNow && !isNotAvailable : !isNotAvailable

            return {
              available,
              hour,
              id: work_time.id
            }
          }
        ) // Compara os horários disponíveis com os horários já marcados e retorna os horários disponíveis
      }).flat()
    }).flat()

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