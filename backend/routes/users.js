const { json } = require("express");
var express = require("express");
const { createToken, isAuthenticate } = require("../utils/auth");
const app = require("../app");
var router = express.Router();
const pool = require("../db");

//ROUTES//

//verify login
router.get("/verifyLogin", isAuthenticate, (req, res) => {
  return res.send({ isAuth: true });
});

//get a user
router.get("/:user_id", async (req, res, next) => {
  console.log(req.params.user_id);
  const user = await selectID(req.params.user_id);
  if (user == undefined) {
    res.status(404).send();
  } else {
    res.status(200).json(user);
  }
});

//update a user
router.put("/", async (req, res) => {
  try {
    console.log(req.body);
    const upuser = {
      user_id: req.body.user_id,
      price: req.body.price,
      drinkname: req.body.drinkname,
      description: req.body.description,
    };
    await updateUser(upuser);
    res.status(201).send(upuser);
  } catch (err) {
    console.error(err.message);
    res.status(404).send();
  }
});

//delete a user
router.del = async (req, res) => {
  try {
    console.log(req.params.user_id);
    const user = await deleteUser(req.params.user_id);
    res.status(200).send();
  } catch (err) {
    console.error(err.message);
    res.status(404).send();
  }
};

//Sign in
router.post("/signIn", async (req, res) => {
  try {
    const userRow = await checkPassword(req.body.email, req.body.password);
    if (userRow) {
      const user = userRow[0];
      res.send({
        _id: user.id,
        email: user.email,
        token: createToken(user),
      });
    } else {
      res.status(401).send({ error: "Email or password is incorrect" });
    }
  } catch (err) {
    res.send(err);
  }
});

//create a user
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const outuser = {
      password: req.body.password,
      email: req.body.email,
    };
    await insertUser(outuser);
    const userRow = await checkPassword(req.body.email, req.body.password);
    const user = userRow[0];
    res.status(201).send({
      _id: user.id,
      email: user.email,
      token: createToken(user),
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).send({ error: "This email has already been registered" });
  }
});

//-- ROUTE HANDLERS---------------------------
selectUserByID = async (user_id) => {
  const select = "SELECT * FROM users WHERE id = $1";
  const query = {
    text: select,
    values: [user_id],
  };
  const { rows } = await pool.query(query);
  return rows.length == 1 ? rows : undefined;
};

checkPassword = async (email, password) => {
  const select = "SELECT * FROM users WHERE email = $1 AND password = $2";
  const query = {
    text: select,
    values: [email, password],
  };
  try {
    const { rows } = await pool.query(query);
    return rows.length == 1 ? rows : undefined;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

insertUser = async (user) => {
  const insert = "INSERT INTO users(password, email) VALUES ($1, $2)";
  const query = {
    text: insert,
    values: [user.password, user.email],
  };
  await pool.query(query);
};

updateUser = async (user) => {
  const update = "UPDATE users SET password = $2, email = $3 WHERE id = $1";
  const query = {
    text: update,
    values: [user.user_id, user.password, user.email],
  };
  await pool.query(query);
};

createTable = async () => {
  await pool.query(
    "CREATE TABLE users(id SERIAL, email text NOT NULL UNIQUE, password text NOT NULL)"
  );
};

dropTable = async () => {
  await pool.query("DROP TABLE users");
};

deleteUser = async (user_id) => {
  const deletion = "DELETE FROM user_entries WHERE id = $1";
  const query = {
    text: deletion,
    values: [user_id],
  };
  await pool.query(query);
};

module.exports = router;
