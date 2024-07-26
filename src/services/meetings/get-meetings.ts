import { env } from "@/env";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { MeetingsRepository } from "@/repositories/meetings-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Meetings } from "@prisma/client";
import { addDays, startOfDay } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import moment from "moment-timezone";

interface GetMeetingsServiceRequest {
  user_id: string;
}

interface GetMeetingsServiceResponse {
  meetings: Meetings[];
}

export class GetMeetingsService {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private usersRepository: UsersRepository,
  ) { }

  async execute({
    user_id,
  }: GetMeetingsServiceRequest): Promise<GetMeetingsServiceResponse> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const today = new Date();

    // Converte 'today' para o fuso horário de São Paulo
    const todayInTimeZone = startOfDay(utcToZonedTime(today, env.TZ));
    // Adiciona 7 dias e converte o resultado para o fuso horário de São Paulo
    const endDateInTimeZone = startOfDay(utcToZonedTime(addDays(today, 7), env.TZ));

    // Converte as datas ajustadas para UTC antes de armazenar ou consultar o banco de dados
    const startDate = zonedTimeToUtc(todayInTimeZone, env.TZ);
    const endDate = zonedTimeToUtc(endDateInTimeZone, env.TZ);

    const startDateTime = moment(startDate).utc(true).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const endDateTime = moment(endDate).utc(true).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    const meetings = await this.meetingsRepository.findByOwnerId(user_id, startDateTime, endDateTime)

    return {
      meetings,
    }

  }
}