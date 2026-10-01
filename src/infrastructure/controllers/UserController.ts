import type { Request, Response } from "express";
import type { CreateUser } from "../../application/use-cases/user/CreateUser.js";
import type { GetAllUsers } from "../../application/use-cases/user/GetAllUsers.js";
import type { FindUserById } from "../../application/use-cases/user/FindUserById.js";
import type { UpdateUser } from "../../application/use-cases/user/UpdateUser.js";
import type { CreateUserDTO } from "../../application/dtos/user/CreateUserDTO.js";
import type { UpdateUserDTO } from "../../application/dtos/user/UpdateUserDTO.js";

class UserController {
  constructor(
    private createUserUseCase: CreateUser,
    private getAllUsersUseCase: GetAllUsers,
    private findUserByIdUseCase: FindUserById,
    private updateUserUseCase: UpdateUser,
  ) {
    this.createUser = this.createUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.findUserById = this.findUserById.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  async createUser(
    reques: Request,
    response: Response,
  ): Promise<Response> {
    const { name, email, password } = reques.body;
    const dto: CreateUserDTO = {
      name,
      email,
      password,
    };
    const outputDTO = await this.createUserUseCase.execute(dto);

    return response.status(201).json(outputDTO);
  }

  async getAllUsers(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const outputDTO = await this.getAllUsersUseCase.execute();
    return response.status(200).json(outputDTO);
  }

  async findUserById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      let { id } = request.params;
      if (!id) {
        throw new Error("User ID is required");
      }

      const outputDTO = await this.findUserByIdUseCase.execute(
        id.toString(),
      );

      return response.status(200).json(outputDTO);
    } catch (error: any) {
      if (error.message === "User not found") {
        return response
          .status(404)
          .json({ error: error.message });
      }
      return response.status(400).json({ error: error.message });
    }
  }

  async updateUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { id } = request.params;
      const { name, email } = request.body;

      if (!id) {
        throw new Error("User ID is required");
      }

      const dto: UpdateUserDTO = {
        name,
        email,
      };

      const outputDTO = await this.updateUserUseCase.execute(
        id.toString(),
        dto,
      );

      return response.status(200).json(outputDTO);
    } catch (error: any) {
      if (error.message === "User not found") {
        return response
          .status(404)
          .json({ error: error.message });
      }
      return response.status(400).json({ error: error.message });
    }
  }
}

export { UserController };
