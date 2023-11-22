import * as bodyParser from "body-parser";
import compression from "compression";
import { Express } from "express";
import helmet from "helmet";
import cors from "cors";

const registerMiddleware = (app: Express) => {
  // cors
  app.use(cors());

  // body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // helmet
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.xssFilter());

  // compression
  app.use(compression());
};

export { registerMiddleware };
