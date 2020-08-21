const passport = require("passport");

exports.authenticateUser = (user, callback) => {
  passport.authenticate("local-signin", (err, user, info) => {
    if (user) {
      callback({ status: "success", user: user });
    } else {
      callback({ status: "failure", msg: "password is not correct" });
    }
  });
};

module.exports = exports;
