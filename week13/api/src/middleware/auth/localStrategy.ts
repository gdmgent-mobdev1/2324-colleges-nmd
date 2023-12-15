import { IVerifyOptions, Strategy as LocalStrategy } from "passport-local";
import User from "../../modules/User/User.model";

const localOptions = {
  usernameField: "email",
};

// local strategy to check login with username and password
const localStrategy = new LocalStrategy(
  localOptions,
  (
    email: string,
    password: string,
    done: (error: any, user?: Express.User | false, options?: IVerifyOptions) => void
  ) => {
    (async () => {
      try {
        const user = await User.findOne({ email });
        if (user) {
          const check = await user.comparePassword(password);
          if (check) {
            return done(null, user);
          }
        }
        return done(null);
      } catch (e) {
        return done(e);
      }
    })();
  }
);

export default localStrategy;
