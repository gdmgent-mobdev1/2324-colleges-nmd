import "dotenv/config";
import mongoose from "mongoose";
import express, { Express } from "express";
import { registerRoutes } from "./routes";
import { registerMiddleware } from "./middleware";

const app: Express = express();
const port: number = parseInt(process.env.PORT ?? "3002");

if (process.env.MONGO_CONNECTION) {
  mongoose
    .connect(process.env.MONGO_CONNECTION)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error(error));
} else {
  throw new Error("No MongoDB connection string");
}

// register middleware
registerMiddleware(app);
// register routes
registerRoutes(app);

// setup server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
