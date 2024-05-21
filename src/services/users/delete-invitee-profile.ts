import { UsersRepository } from "@/repositories/users-repository";

interface DeleteInviteeProfileServiceRequest {
  id: string;
}


export class DeleteInviteeProfileService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ id }: DeleteInviteeProfileServiceRequest) {

    await this.usersRepository.deleteInviteeProfile(id)

  }
}