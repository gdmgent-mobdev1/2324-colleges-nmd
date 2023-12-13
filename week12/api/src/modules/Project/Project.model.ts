import mongoose from "mongoose";
import { Project } from "./Project.types";
import validateModel from "../../validation/validateModel";

const projectSchema = new mongoose.Schema<Project>(
  {
    name: {
      type: String,
      required: true,
    },
    clientId: {
      // don't import ObjectId -> TS problems
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.virtual("client", {
  ref: "Client",
  localField: "clientId",
  foreignField: "_id",
  justOne: true,
});

projectSchema.pre("save", function (next) {
  validateModel(this);
  next();
});

const ProjectModel = mongoose.model<Project>("Project", projectSchema);

export default ProjectModel;
