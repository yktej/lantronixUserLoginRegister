const createError = require("http-errors");
const express = require("express");
const path = require("path");
//var cookieParser = require("cookie-parser");
const morgan = require("morgan");
const winston = require("./configuration/winston");

//var session = require("express-session"),
passport = require("./configuration/passport");
//const cors = require("cors");

//const redis = require("./redis");

const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=7776000;includeSubDomains"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, x-api-key, content-type, Authorization, userid, domain, cache-control"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  //Set Cache Control
  res.header("X-Frame-Options", "sameorigin");
  res.header("X-Content-Type-Options", "nosniff");

  // Pass to next layer of middleware
  next();
});

process.env.ORIGIN = "http://localhost:3000";
//credentials: true to  enable set cookie
/* app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], //frontend server localhost:8080
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // enable set cookie
  })
); */

//const redisStore = require("connect-redis")(session);
/* app.use(
  session({
    secret: "158d72678517c2cfa13f5bbf7cdcc368",
    name: "EXSSID",
    store: new redisStore({
      client: redis.sessClient,
      ttl: 86400,
    }),
    resave: false,
    cookie: {
      //httpOnly:true
      httpOnly: true,
      maxAge: 1000 * 60 * 30, //time that the cookie stays on the redis db
    },
    saveUninitialized: false,
  })
); */

app.use(morgan("combined", { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");

app.use("/", indexRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (req, res, next) {
  res.send("no url found ");
});

/*
// error handler
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

});
*/

module.exports = app;
