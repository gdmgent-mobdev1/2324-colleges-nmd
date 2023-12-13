import { Client } from "../clients/Client.types";

export type Project = {
  _id: string;
  name: string;
  clientId: string;
  client?: Client;
};

export type ProjectBody = Omit<Project, "_id">;
