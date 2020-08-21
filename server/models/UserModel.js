var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var config = require("../configuration/config");

var conn2 = mongoose.createConnection(config.dbUrl);
var Schema = mongoose.Schema; // <-- EDIT: missing in the original post
var schema = new Schema({
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
});

//generate hash
schema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

schema.methods.isPasswordValid = function (password) {
  let isPswdValid;
  try {
    isPswdValid = bcrypt.compareSync(password, this.password);
  } catch (error) {
    //bcrypt throws error on pswd mismatch
    isPswdValid = false;
  }
  return isPswdValid;
};

module.exports = conn2.model("users", schema, "users");
