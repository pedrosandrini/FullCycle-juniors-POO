import type { IUserRepository } from "../../../domain/repositories/IUserRepository.js";
import type { UserOutputDTO } from "../../dtos/user/UserOutputDTO.js";

class GetAllUsers {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<UserOutputDTO[]> {
    const usersOutput = await this.userRepository.findAll();

    const outputDTO: UserOutputDTO[] = usersOutput.map(
      (user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    );

    return outputDTO;
  }
}

export { GetAllUsers };
