import { Express } from "express";
import { getClients } from "../modules/Client/Client.controller";

const registerRoutes = (app: Express) => {
  app.get("/clients", getClients);
};

export { registerRoutes };
