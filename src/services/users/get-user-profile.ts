import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { Prisma } from "@prisma/client";

interface GetUserProfileServiceRequest {
  user_id: string;
}

interface GetUserProfileServiceResponse {
  user: Prisma.UserGetPayload<{ include: { integration: true } }> | null
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