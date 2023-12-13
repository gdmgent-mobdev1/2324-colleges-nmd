import mongoose from "mongoose";
import validateModel from "../../validation/validateModel";
import isValidEmail from "../../validation/isValidEmail";
import { Client } from "./Client.types";
import { ObjectId } from "mongodb";

const clientSchema = new mongoose.Schema<Client>(
  {
    name: {
      type: String,
      required: true,
    },
    ownerId: {
      type: ObjectId,
      required: true,
    },
    contactPerson: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        validate: {
          validator: isValidEmail,
          message: "Email is not valid",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

clientSchema.pre("save", function (next) {
  validateModel(this);
  next();
});

const ClientModel = mongoose.model<Client>("Client", clientSchema);

export default ClientModel;
