import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { compare } from "bcryptjs";

interface AthenticateServiceRequest {
  email: string;
  password: string;
}

interface AthenticateServiceResponse {
  user: User;
}

export class AthenticateService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, password }: AthenticateServiceRequest): Promise<AthenticateServiceResponse> {

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash ?? '')

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }

  }
}