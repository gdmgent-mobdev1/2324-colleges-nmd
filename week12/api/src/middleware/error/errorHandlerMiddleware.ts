import { Request, Response, NextFunction } from "express";
import AppError from "./AppError";
import { Error } from "mongoose";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Mongoose validation error
  if (err instanceof Error.ValidationError) {
    return res.status(400).json({
      message: err.message,
      errors: err.errors,
    });
  }

  // Custom app errors
  if (err instanceof AppError) {
    const { statusCode, message } = err;
    return res.status(statusCode).json({
      message,
    });
  }

  // Unknown errors
  res.status(500).json({
    message: err.message ?? "Internal server error",
  });
};
