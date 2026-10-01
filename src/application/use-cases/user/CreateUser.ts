import { User } from "../../../domain/entities/User.js";
import type { IUserRepository } from "../../../domain/repositories/IUserRepository.js";
import { CreateUserDTO } from "../../dtos/user/CreateUserDTO.js";
import type { UserOutputDTO } from "../../dtos/user/UserOutputDTO.js";

class CreateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(dto: CreateUserDTO): Promise<UserOutputDTO> {
    const id = crypto.randomUUID();
    const user = User.create(id, { ...dto });

    const userOutput: User =
      await this.userRepository.save(user);

    const outputDTO: UserOutputDTO = {
      id: userOutput.id,
      name: userOutput.name,
      email: userOutput.email,
    };

    return outputDTO;
  }
}

export { CreateUser };
