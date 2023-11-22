import { Express } from "express";
import clientRoutes from "../modules/Client/Client.routes";

const registerRoutes = (app: Express) => {
  app.use("/", clientRoutes);
};

export { registerRoutes };
