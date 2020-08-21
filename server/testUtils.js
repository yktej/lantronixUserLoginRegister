const mongoose = require("mongoose");
//const MongodbMemoryServer = require("mongodb-memory-server").default;
//const mongod = new MongodbMemoryServer();
const config = require("./configuration/config");
const app = require("./app");
//const session = require("supertest-session");

let testSession = null;
let headerToken = null;

// Create connection to mongoose before all tests
exports.before = async (t) => {
  //mongoose.connect(await mongod.getConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true });//For temporary mongodb
  await mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  /* testSession = session(app);

  await testSession
    .post("/api/login")
    .send({ userName: "khasim@onesingleview.com", password: "12345" })
    .expect(200)
    .then((res) => {
      headerToken = "Barear " + res.body.data.accessToken;
      t.context.session = testSession;
      t.context.session.accessToken = headerToken;
      res.body.success ? t.pass() : t.fail();
    })
    .catch((err) => {
      t.fail();
    });*/
};

// Create fixtures before each test
exports.beforeEach = (t) => {
  t.context.app = app;
  // testSession = session(app);
};

// Disconnect MongoDB and mongoose after all tests are done
exports.after = (t) => {
  mongoose.disconnect();
  //mongod.stop();
};
