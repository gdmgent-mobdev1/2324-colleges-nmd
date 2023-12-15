import { Document } from "mongoose";

const validateModel = (model: Document) => {
  const validationError = model.validateSync();
  if (validationError) {
    throw validationError;
  }
};

export default validateModel;
