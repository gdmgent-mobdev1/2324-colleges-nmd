import "dotenv/config";

import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";

const port: number = parseInt(process.env.PORT ?? "3002");

if (process.env.MONGO_CONNECTION) {
  mongoose
    .connect(process.env.MONGO_CONNECTION)
    .then(() => {
      console.log("Connected to MongoDB");

      // start server
      const server = app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
      });

      process.on("SIGINT", () => stopServer(server));
      process.on("SIGTERM", () => stopServer(server));
    })
    .catch((error) => console.error(error));
} else {
  throw new Error("No MongoDB connection string");
}

const stopServer = (server: Server) => {
  mongoose.connection.close();
  server.close(() => {
    console.log("Server closed");
    process.exit();
  });
};
