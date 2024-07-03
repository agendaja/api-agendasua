import { SquadsRepository } from "@/repositories/squads-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import { SquadsMemberRepository } from "@/repositories/squads-member-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { SendMail } from "../mail";
import { env } from "@/env";

interface InviteSellerToSquadServiceRequest {
  name: string;
  email: string;
  squad_id: string;
  token: string;
}

export class InviteSellerToSquadService {
  constructor(
    private squadsRepository: SquadsRepository,
    private usersRepository: UsersRepository,
    private squadsMemberRepository: SquadsMemberRepository,
  ) { }

  async execute({
    name,
    email,
    squad_id,
    token
  }: InviteSellerToSquadServiceRequest) {

    /* Responsabilidades do serviço 
      - Verificar se o usuário já existe no banco
      - Caso exista, valida se já não está cadastrado na squad
      - Envia o email para confirmação de cadastro na squad

      - Se não exisitir, cria uma pré conta 
      - Envia um email para cadastro da senha 
      - E adiciona o novo usuário na squad

    */
    const squadToAddSeller = await this.squadsRepository.findSquadById(squad_id);

    if (!squadToAddSeller) {
      throw new ResourceNotFoundError()
    }

    const existingUser = await this.usersRepository.findByEmail(email);

    if (!existingUser) {
      const newUser = await this.usersRepository.createPreRegister({
        name,
        email,
        squad_id,
        token
      });

      await SendMail(
        {
          name: newUser.name,
          email: newUser.email
        },
        {
          name: squadToAddSeller.user.name,
          email: squadToAddSeller.user.email
        },
        `[CONVITE ${squadToAddSeller.name}]`,
        'new-user-and-squad-member',
        {
          squadName: squadToAddSeller.name,
          url: `${env.WEBSITE_URL}/invite?token=${token}`
        }
      )

    } else {
      const existingSquadMember = await this.squadsMemberRepository.findUserInSquad(squad_id, existingUser.email);

      if (existingSquadMember) {
        throw new UserAlreadyExistsError();
      }

      await this.usersRepository.createPreRegister({
        name: existingUser.name,
        email: existingUser.email,
        user_id: existingUser.id,
        squad_id,
        token
      });

      await SendMail(
        {
          name: existingUser.name,
          email: existingUser.email
        },
        {
          name: squadToAddSeller.user.name,
          email: squadToAddSeller.user.email
        },
        `[CONVITE ${squadToAddSeller.name}]`,
        'new-squad-member',
        {
          squadName: squadToAddSeller.name,
          url: `${env.WEBSITE_URL}/invite?token=${token}`
        }
      )
    }






  }
}