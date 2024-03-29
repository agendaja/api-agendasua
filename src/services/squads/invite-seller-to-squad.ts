import { SquadsRepository } from "@/repositories/squads-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import { SquadsMemberRepository } from "@/repositories/squads-member-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

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
    const squadToAddSeller = await this.squadsRepository.findSquadById(squad_id);

    if (!squadToAddSeller) {
      throw new ResourceNotFoundError()
    }

    const existingUser = await this.usersRepository.findByEmail(email);

    if (!existingUser) {
      await this.usersRepository.createPreRegister({
        name,
        email,
        squad_id,
        token
      });

      return
    }

    const existingSquadMember = await this.squadsMemberRepository.findUserInSquad(squad_id, existingUser.email);

    if (existingSquadMember) {
      throw new UserAlreadyExistsError();
    }

    await this.usersRepository.createPreRegister({
      name,
      email,
      squad_id,
      token,
      user_id: existingUser.id
    });

    // TODO: Send email to user

  }
}