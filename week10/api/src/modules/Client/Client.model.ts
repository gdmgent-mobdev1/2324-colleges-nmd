import { NextFunction } from "express";
import mongoose from "mongoose";
import validateModel from "../../validation/validateModel";
import isValidEmail from "../../validation/isValidEmail";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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

clientSchema.pre("save", function (next: NextFunction) {
  validateModel(this);
  next();
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
