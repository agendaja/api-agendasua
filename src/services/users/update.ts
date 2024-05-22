import { UsersRepository } from "@/repositories/users-repository";
import { Prisma, User } from "@prisma/client";
import { DocumentAlreadyTakenError } from "../errors/document-already-taken";

interface UpdateUserServiceRequest {
  name?: string;
  phone?: string;
  document?: string;
  user_id: string;
}

interface GetUserProfileServiceResponse {
  user: Prisma.UserGetPayload<{ include: { integration: true } }> | null
}
export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ name, phone, document, user_id }: UpdateUserServiceRequest): Promise<GetUserProfileServiceResponse> {

    const newUser = {} as User

    if (name) {
      newUser.name = name
    }

    if (phone) {
      newUser.phone = phone
    }

    if (document) {
      const existingUser = await this.usersRepository.findOne({ document })

      if (existingUser && existingUser.id !== user_id) {
        throw new DocumentAlreadyTakenError()
      }

      newUser.document = document
    }

    const user = await this.usersRepository.update(newUser, user_id)

    return {
      user
    }
  }
}