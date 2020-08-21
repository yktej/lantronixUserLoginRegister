var express = require("express");
var passport = require("passport");
var router = express.Router();

let loginController = require("../controllers/LoginController");

/*POST
 route for  user register 
. */
router.post("/register", loginController.registerUser);

/*POST
 route for  user login 
. */
router.post("/login", loginController.login);

module.exports = router;
