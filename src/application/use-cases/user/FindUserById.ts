import { User } from "../../../domain/entities/User.js";
import type { IUserRepository } from "../../../domain/repositories/IUserRepository.js";
import type { UserOutputDTO } from "../../dtos/user/UserOutputDTO.js";

class FindUserById {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserOutputDTO> {
    const userOutput = await this.userRepository.findById(id);
    if (!userOutput) {
      throw new Error("User not found");
    }

    const outputDTO: UserOutputDTO = {
      id: userOutput.id,
      name: userOutput.name,
      email: userOutput.email,
    };

    return outputDTO;
  }
}

export { FindUserById };
