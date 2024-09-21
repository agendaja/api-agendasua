import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
  document?: string;
  phone: string;
  admin?: boolean;
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ name, email, password, phone, admin = false, document }: RegisterServiceRequest) {
    const password_hash = await hash(password, 6)

    const existingUser = await this.usersRepository.findByEmail(email)

    if (existingUser) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      phone,
      admin,
      document
    })

    return { 
      user
    }
  }
}