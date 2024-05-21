import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { UserTypes } from "@/@types/users";

interface GetUserProfileServiceRequest {
  user_id: string;
}

interface GetUserProfileServiceResponse {
  user: UserTypes.UserIntegration;
}

export class GetUserProfileService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ user_id }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user
    }

  }
}