var express = require("express");
const { restart } = require("nodemon");
const app = require("../app");
var router = express.Router();
const pool = require("../db");

//app.use(express.json()) // => req.body

//ROUTES//

//get all bobas
router.getAll = async (req, res) => {
  const bobas = await selectBoba();
  res.status(200).json(bobas);
};
//get a boba
router.getBoba = async (req, res) => {
  const boba = await selectByID(req.params.id);
  console.log(boba);
  if (boba == undefined) {
    res.status(404).send();
  } else {
    res.status(200).json(boba);
  }
};

router.getOne = async (req, res) => {
  console.log(req.params.boba_id, req.params.drinkname, req.params.email);
  const boba = await selectID(
    req.params.purchase_date,
    req.params.drinkname,
    req.params.email
  );
  if (boba == undefined) {
    res.status(404).send();
  } else {
    res.status(200).json(boba);
  }
};

//get all bobas for one user
router.getUsersDrinks = async (req, res) => {
  console.log(req.params.email);
  const boba = await selectUser(req.params.email);
  if (boba == undefined) {
    res.status(404).send();
  } else {
    res.status(200).json(boba);
  }
};

//create a boba
router.post = async (req, res) => {
  try {
    console.log(req.body);
    const outBoba = {
      purchase_date: req.body.purchase_date,
      drinkname: req.body.drinkname,
      price: req.body.price,
      sweetness: req.body.sweetness,
      email: req.body.email,
    };
    await insertBoba(outBoba);
    res.status(201).send(outBoba);
  } catch (err) {
    console.error(err.message);
    res.status(404).send();
  }
};

//update a boba
router.update = async (req, res) => {
  const value = parseFloat(req.body.sweetness);
  if (
    value == 0 ||
    value == 0.25 ||
    value == 0.5 ||
    value == 0.75 ||
    value == 1.0
  ) {
    try {
      const upBoba = {
        purchase_date: req.body.date,
        drinkname: req.body.drink,
        price: req.body.price,
        sweetness: req.body.sweetness,
        id: req.params.id,
      };
      await updateBoba(upBoba);
      res.status(204).send(upBoba);
    } catch (err) {
      console.error(err.message);
      res.status(404).send();
    }
  }
};

//delete a boba
router.del = async (req, res) => {
  try {
    console.log(req);
    console.log(req.params.id);
    const boba = await deleteBoba(req.params.id);
    res.status(200).send();
  } catch (err) {
    console.error(err.message);
    res.status(404).send();
  }
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//-- ROUTE HANDLERS---------------------------
selectBoba = async () => {
  const select = "SELECT * FROM boba_entries";
  const { rows } = await pool.query(select);
  return rows;
};

selectByID = async (id) => {
  const select = "SELECT * FROM boba_entries WHERE id = $1";
  const query = {
    text: select,
    values: [id],
  };
  const { rows } = await pool.query(query);
  return rows.length == 1 ? rows : undefined;
};

selectID = async (purchase_date, drinkname, email) => {
  const select =
    "SELECT * FROM boba_entries WHERE purchase_date = $1 AND drinkname = $2 AND email = $3";
  const query = {
    text: select,
    values: [purchase_date, drinkname, email],
  };
  const { rows } = await pool.query(query);
  return rows.length == 1 ? rows : undefined;
};

selectUser = async (email) => {
  console.log(email);
  const select = 'SELECT * FROM boba_entries WHERE "email" = $1';
  const query = {
    text: select,
    values: [email],
  };
  console.log(query);
  const { rows } = await pool.query(query);
  return rows.length >= 1 ? rows : undefined;
};

insertBoba = async (boba) => {
  const insert =
    "INSERT INTO boba_entries(purchase_date, drinkname, price, sweetness, email) VALUES ($1, $2, $3, $4, $5)";
  const query = {
    text: insert,
    values: [
      boba.purchase_date,
      boba.drinkname,
      boba.price,
      boba.sweetness,
      boba.email,
    ],
  };
  await pool.query(query);
};

updateBoba = async (boba) => {
  const update =
    "UPDATE boba_entries SET purchase_date = $1, drinkname = $2, price = $3, sweetness = $4 WHERE id = $5";
  const query = {
    text: update,
    values: [
      boba.purchase_date,
      boba.drinkname,
      boba.price,
      boba.sweetness,
      boba.id,
    ],
  };
  await pool.query(query);
};

deleteBoba = async (id) => {
  const deletion = "DELETE FROM boba_entries WHERE id = $1";
  const query = {
    text: deletion,
    values: [id],
  };
  await pool.query(query);
};

module.exports = router;
