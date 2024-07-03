import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { hash } from "bcryptjs";
import { User } from "@prisma/client";

interface ResetPasswordServiceRequest {
  email: string;
  password: string;
}


export class ResetPasswordService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, password }: ResetPasswordServiceRequest) {

    const user = await this.usersRepository.findOne({ email })

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const newUser = {} as User

    const password_hash = await hash(password, 6)

    newUser.password_hash = password_hash

    await this.usersRepository.update(newUser, user.id)
  }
}