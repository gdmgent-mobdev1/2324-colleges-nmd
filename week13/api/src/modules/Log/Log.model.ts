import mongoose from "mongoose";
import validateModel from "../../validation/validateModel";
import { Log } from "./Log.types";

const logSchema = new mongoose.Schema<Log>(
  {
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: function () {
        return new Date();
      },
    },
    projectId: {
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

logSchema.virtual("project", {
  ref: "Project",
  localField: "projectId",
  foreignField: "_id",
  justOne: true,
});

logSchema.pre("save", function (next) {
  validateModel(this);
  next();
});

const LogModel = mongoose.model<Log>("Log", logSchema);

export default LogModel;
