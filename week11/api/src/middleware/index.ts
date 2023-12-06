import compression from "compression";
import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";

const registerMiddleware = (app: Express) => {
  // cors
  app.use(cors());

  // json
  app.use(express.json());

  // helmet
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.xssFilter());

  // compression
  app.use(compression());
};

export { registerMiddleware };
