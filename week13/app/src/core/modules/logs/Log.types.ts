import { Project } from "../projects/Project.types";

export type Log = {
  _id: string;
  description: string;
  date: string;
  duration: number;
  projectId: string;
  project?: Project;
};

export type LogBody = Omit<Log, "_id">;
