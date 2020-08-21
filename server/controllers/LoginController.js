const passport = require("passport");

const winston = require("../configuration/winston");

/**.
 * params req,res,next
 * authenticates the user credentials using passport middleware
 */
exports.login = (req, res, next) => {
  winston.debug("in login method");
  let user = {
    username: req.body.username,
    password: req.body.password,
  };

  passport.authenticate("local-signin", (err, user, info) => {
    winston.debug("inside passport auth"); // debug level configured to console

    if (user) {
      winston.info("login authentication successful"); // info level configured to file
      return res.json(user);
    } else {
      winston.debug("Invalid User Credentials");
      return res.json({ status: "failure", msg: "Invalid User Credentials" });
    }
  })(req, res, next);
};

/**
 * params req,res,next
 * registers the user using the passport middleware
 */
exports.registerUser = (req, res, next) => {
  passport.authenticate("local-signup", (err, user, info) => {
    winston.debug("inside passport auth");

    if (user) {
      winston.info("user succesfully registered");
      return res.json({
        message: "A verification mail has been sent to your registered mail.",
      });
    } else return res.json({ status: "failure", message: err.message });
  })(req, res, next);
};

module.exports = exports;
