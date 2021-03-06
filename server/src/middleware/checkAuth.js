import passportJWT from "../config/passport-jwt.js";

export default {
  checkAuthenticated: (req, res, next) => {
    passportJWT.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).send("Invalid token, please login or sign up");
      }

      req.user = user;
      return next();
    })(req, res, next);
  },
};
