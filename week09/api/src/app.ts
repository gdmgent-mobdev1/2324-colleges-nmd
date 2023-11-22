import express, { Express } from "express";
import { registerRoutes } from "./routes";
import { registerMiddleware } from "./middleware";

const app: Express = express();

// register middleware
registerMiddleware(app);
// register routes
registerRoutes(app);

export default app;
