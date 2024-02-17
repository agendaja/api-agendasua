import { UsersRepository } from "@/repositories/users-repository";
import { Invite } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetInviteeProfileServiceRequest {
  email: string;
  squad_id: string;
}

interface GetInviteeProfileServiceResponse {
  user: Invite;
}

export class GetInviteeProfileService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, squad_id }: GetInviteeProfileServiceRequest): Promise<GetInviteeProfileServiceResponse> {

    const user = await this.usersRepository.findInviteeByEmail(email, squad_id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }

  }
}