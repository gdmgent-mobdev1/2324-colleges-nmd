import { Document, ObjectId } from "mongoose";
import { Project } from "../Project/Project.types";

export type Log = Document & {
  _id?: string;
  description: string;
  duration: number;
  date: Date;
  ownerId: ObjectId;
  projectId: ObjectId;
  project?: Project;
};
