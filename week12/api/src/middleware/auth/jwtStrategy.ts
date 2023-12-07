import { ExtractJwt, Strategy as JWTStrategy, VerifiedCallback } from "passport-jwt";
import UserModel from "../../modules/User/User.model";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// jwt strategy to check jwt token
const jwtStrategy = new JWTStrategy(jwtOptions, (payload: any, done: VerifiedCallback) => {
  (async () => {
    try {
      const user = await UserModel.findById(payload._id);

      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  })();
});

export default jwtStrategy;
