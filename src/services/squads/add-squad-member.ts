import { SquadsRepository } from "@/repositories/squads-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import { SquadsMemberRepository } from "@/repositories/squads-member-repository";
import { WorkTimeRepository } from "@/repositories/work-time-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface AddSquadMemberServiceRequest {
  email: string;
  squad_id: string;
}

export class AddSquadMemberService {
  constructor(
    private squadsRepository: SquadsRepository,
    private usersRepository: UsersRepository,
    private squadsMemberRepository: SquadsMemberRepository,
    private workTimeRepository: WorkTimeRepository,
  ) { }

  async execute({
    email,
    squad_id,
  }: AddSquadMemberServiceRequest) {
    const squadToAddSeller = await this.squadsRepository.findSquadById(squad_id);

    if (!squadToAddSeller) {
      throw new ResourceNotFoundError()
    }

    const existingUser = await this.usersRepository.findByEmail(email);

    if (!existingUser) {
      throw new ResourceNotFoundError();
    }

    const existingSquadMember = await this.squadsMemberRepository.findUserInSquad(squad_id, existingUser.email);

    if (existingSquadMember) {
      throw new UserAlreadyExistsError();
    }

    await this.squadsMemberRepository.create(squad_id, existingUser.id);

    await this.workTimeRepository.addSquadWorkTimeToSeller(squad_id, existingUser.id, squadToAddSeller.weekly_hours);

  }
}