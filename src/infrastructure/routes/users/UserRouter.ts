import { Router } from "express";
import { UserController } from "../../controllers/UserController.js";

function UserRouter(userController: UserController): Router {
  const router = Router();

  router.get("/", userController.getAllUsers);

  router.get("/:id", userController.findUserById);

  router.post("/", userController.createUser);

  router.delete("", (request, response) => {
    response.json({ message: "Delete a user" });
  });

  router.put("/:id", userController.updateUser);

  return router;
}

export { UserRouter };
