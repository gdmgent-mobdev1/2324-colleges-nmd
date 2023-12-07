import { Document } from "mongoose";

export type Client = Document & {
  _id?: string;
  name: string;
  contactPerson: {
    firstName: string;
    lastName: string;
    email: string;
  };
};
