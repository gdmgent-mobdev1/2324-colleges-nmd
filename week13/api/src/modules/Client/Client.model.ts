import mongoose from "mongoose";
import validateModel from "../../validation/validateModel";
import isValidEmail from "../../validation/isValidEmail";
import { Client } from "./Client.types";
import ProjectModel from "../Project/Project.model";

const clientSchema = new mongoose.Schema<Client>(
  {
    name: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
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

clientSchema.pre("deleteOne", { document: true, query: false }, function (next) {
  // delete all projects that belong to this client
  ProjectModel.deleteMany({ clientId: this._id }).exec();
  next();
});

clientSchema.pre(["findOneAndDelete", "deleteMany"], function (next) {
  // delete all projects that belong to this client
  const id = this.getFilter()["_id"];
  ProjectModel.deleteMany({ clientId: id }).exec();
  next();
});

const ClientModel = mongoose.model<Client>("Client", clientSchema);

export default ClientModel;
