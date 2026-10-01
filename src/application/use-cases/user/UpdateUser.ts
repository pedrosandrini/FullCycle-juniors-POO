import type { IUserRepository } from "../../../domain/repositories/IUserRepository.js";
import { UpdateUserDTO } from "../../dtos/user/UpdateUserDTO.js";
import type { UserOutputDTO } from "../../dtos/user/UserOutputDTO.js";

class UpdateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    id: string,
    dto: UpdateUserDTO,
  ): Promise<UserOutputDTO> {
    let userOutput = await this.userRepository.findById(id);
    if (!userOutput) {
      throw new Error("User not found");
    }

    if (dto.name) {
      userOutput.changeName(dto.name);
    }

    if (dto.email) {
      userOutput.changeEmail(dto.email);
    }

    userOutput = await this.userRepository.update(userOutput);

    const outputDTO: UserOutputDTO = {
      id: userOutput.id,
      name: userOutput.name,
      email: userOutput.email,
    };

    return outputDTO;
  }
}

export { UpdateUser };
