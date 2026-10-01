import { Router } from "express";
import { UserRoutes } from "./users/index.js";

function AppRoutesV1(): Router {
  const router = Router();

  router.use("/v1", UserRoutes());
  return router;
}

export { AppRoutesV1 };
