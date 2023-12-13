import { Document, ObjectId } from "mongoose";

export type Client = Document & {
  _id?: string;
  name: string;
  ownerId: ObjectId;
  contactPerson: {
    firstName: string;
    lastName: string;
    email: string;
  };
};
