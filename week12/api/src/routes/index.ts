import { Express, Router } from "express";
import clientRoutes from "../modules/Client/Client.routes";
import projectRoutes from "../modules/Project/Project.routes";
import { errorHandler } from "../middleware/error/errorHandlerMiddleware";
import userPublicRoutes from "../modules/User/User.public.routes";
import userPrivateRoutes from "../modules/User/User.private.routes";

import { authJwt } from "../middleware/auth/authMiddleware";

const registerRoutes = (app: Express) => {
  app.use("/", userPublicRoutes);

  const authRoutes = Router();
  authRoutes.use("/", userPrivateRoutes);
  authRoutes.use("/", clientRoutes);
  authRoutes.use("/", projectRoutes);

  app.use(authJwt, authRoutes);

  // should be placed AFTER all routes
  app.use(errorHandler);
};

export { registerRoutes };
