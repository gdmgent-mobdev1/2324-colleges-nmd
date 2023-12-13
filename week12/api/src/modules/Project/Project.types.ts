import { Document, ObjectId } from "mongoose";
import { Client } from "../Client/Client.types";

export type Project = Document & {
  _id?: string;
  name: string;
  ownerId: ObjectId;
  clientId: ObjectId;
  client?: Client;
};
