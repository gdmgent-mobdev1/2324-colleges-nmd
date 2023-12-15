import AppError from "./AppError";

export default class AuthError extends AppError {
  constructor() {
    super("Unauthorized", 401);
  }
}
