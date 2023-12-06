import passport from "passport";
import AuthError from "../error/AuthError";
import { User } from "../../modules/User/User.types";
import { NextFunction, Request, Response } from "express";
import localStrategy from "./localStrategy";
import jwtStrategy from "./jwtStrategy";

passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

export interface AuthRequest extends Request {
  user: User;
}

const passportHandler = (strategy: string) => {
  return function (req: Request, res: Response, next: NextFunction) {
    passport.authenticate(strategy, { session: false }, function (err: any, user?: User | false) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new AuthError());
      } else {
        req.user = user;
        return next();
      }
    })(req, res, next);
  };
};

const authLocal = passportHandler("local");
const authJwt = passportHandler("jwt");

export { authLocal, authJwt };
