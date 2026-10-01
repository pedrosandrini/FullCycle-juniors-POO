import { Router } from "express";
import { UserRouter } from "./UserRouter.js";
import { UserRepositoryInMemory } from "../../repository/UserRepositoryInMemory.js";
import { CreateUser } from "../../../application/use-cases/user/CreateUser.js";
import { GetAllUsers } from "../../../application/use-cases/user/GetAllUsers.js";
import { UserController } from "../../controllers/UserController.js";
import { FindUserById } from "../../../application/use-cases/user/FindUserById.js";
import { UpdateUser } from "../../../application/use-cases/user/UpdateUser.js";

function UserRoutes(): Router {
  const router = Router();

  const userRepository = new UserRepositoryInMemory();
  const createUserUseCase = new CreateUser(userRepository);
  const getAllUsersUseCase = new GetAllUsers(userRepository);
  const findUserByIdUseCase = new FindUserById(userRepository);
  const updateUserUseCase = new UpdateUser(userRepository);

  const userController = new UserController(
    createUserUseCase,
    getAllUsersUseCase,
    findUserByIdUseCase,
    updateUserUseCase,
  );

  router.use("/users", UserRouter(userController));
  return router;
}

export { UserRoutes };
