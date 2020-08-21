const test = require("ava");
const request = require("supertest");
const { before, beforeEach, after } = require("../testUtils");

test.before(before);
test.beforeEach(beforeEach);

test.serial("Login - User authentication successfull", async (t) => {
  const { app } = t.context;
  const mockKeys = ["_id", "userName", "password"];
  await request(app)
    .post("/user/login")
    .send({ username: "teja", password: "Ykteja@222" })
    .expect(200)
    .then((res) => {
      if (res.body.token) {
        if (res.body.data !== null && res.body.data) {
          const keys = Object.keys(res.body.data);
          if (JSON.stringify(keys) === JSON.stringify(mockKeys)) {
            t.pass();
          }
        }
        t.pass();
      } else {
        t.fail();
      }
    })
    .catch((err) => {
      t.fail();
    });
});

test.serial("Login - User authentication failed", async (t) => {
  const { app } = t.context;
  await request(app)
    .post("/user/login")
    .send({ userName: "teja", password: "" })
    .expect(200)
    .then((res) => {
      !res.body.success ? t.pass() : t.fail();
    })
    .catch((err) => {
      t.pass();
    });
});

test.after.always(after);
