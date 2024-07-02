import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { SendMail } from "../mail";
import { env } from "@/env";

interface RecoverPasswordServiceRequest {
  email: string;
  token: string;
}


export class RecoverPasswordService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, token }: RecoverPasswordServiceRequest) {

    const user = await this.usersRepository.findOne({ email })

    if (!user) {
      throw new ResourceNotFoundError()
    }

    await SendMail(
      {
        name: user.name,
        email: user.email
      },
      {
        name: user.name,
        email: user.email
      },
      `[RECUPERAÇÃO DE SENHA]`,
      'recover-password',
      {
        url: `${env.WEBSITE_URL}/resetar-senha?token=${token}`
      }
    )
  }
}