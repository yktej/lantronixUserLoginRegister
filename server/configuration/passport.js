const passport = require("passport");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const winston = require("../configuration/winston");

const userModel = require("../models/UserModel");

const LocalStrategy = require("passport-local").Strategy;

/**.
 * The local passport authentication strategy authenticates users using a username and password.
 * created a jwt token after succesfull authentication
 */
passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passportField: "password" /*,
  passReqToCallback:true*/,
    },
    function (username, password, done) {
      userModel.findOne({ username: username }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          winston.debug("User doesn't exist");
          return done({ msg: "User doesn't exist" }, false);
        }

        if (!user.isPasswordValid(password)) {
          winston.debug("Invalid user credentials");
          return done({ msg: "Invalid user credentials" }, false);
        }

        user = user.toObject();

        const token = jwt.sign({ id: user.username }, "jwtSecret");
        return done(null, { token, user });
      });
    }
  )
);

/**.
 * Passport strategy for registering a user.
 * Throws error if user already exists
 */
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passportField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const user = await userModel.findOne({ username: username }).lean();
        if (user) {
          winston.info("Invalid user credentials");
          return done(
            { status: "error", message: "user already exists" },
            false
          );
        }

        const { firstname, lastname, email } = req.body;
        let newUser = new userModel();
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        newUser.firstName = firstname;
        newUser.lastName = lastname;
        newUser.email = email;

        const resp = await newUser.save();
        //   return done(null, newUser);
        return done(null, resp);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
