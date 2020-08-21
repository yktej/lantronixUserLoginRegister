const test = require("ava");
const request = require("supertest");
const { before, beforeEach, after } = require("../testUtils");

test.before(before);
test.beforeEach(beforeEach);

test.serial("Register - User registration successfull", async (t) => {
  const { app } = t.context;
  const mockKeys = ["_id", "userName", "password"];
  await request(app)
    .post("/user/register")
    .send({
      username: "teja",
      firstname: "krishna",
      lastname: "teja",
      email: "ykrishnateja20@gmail.com",
      password: "Ykteja@222",
    })
    .expect(200)
    .then((res) => {
      if (res.body.message) {
        t.pass();
      } else {
        t.fail();
      }
    })
    .catch((err) => {
      t.fail();
    });
});

/* test.serial("Register - User registration failed", async (t) => {
  const { app } = t.context;
  await request(app)
    .post("/user/register")
    .send({ userName: "teja", password: "" })
    .expect(200)
    .then((res) => {
      !res.body.success ? t.pass() : t.fail();
    })
    .catch((err) => {
      t.pass();
    });
}); */

test.after.always(after);
