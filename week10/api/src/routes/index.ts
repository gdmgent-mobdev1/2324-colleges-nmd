import { Express } from "express";
import clientRoutes from "../modules/Client/Client.routes";
import { errorHandler } from "../middleware/error/errorHandlerMiddleware";

const registerRoutes = (app: Express) => {
  app.use("/", clientRoutes);

  // should be placed AFTER all routes
  app.use(errorHandler);
};

export { registerRoutes };
