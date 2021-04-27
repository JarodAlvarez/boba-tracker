var express = require('express');
const { restart } = require('nodemon');
const app = require('../app');
var router = express.Router();
const pool = require("../db");

//app.use(express.json()) // => req.body

//ROUTES//

//get all bobas
router.getAll = async (req, res) => {
  const bobas = await selectBoba();
  res.status(200).json(bobas);
}
//get a boba
router.getOne = async (req, res) => {
  const boba = await selectID(req.params.boba_id);
  if (boba == undefined) {
    res.status(404).send();
  } else {
    res.status(200).json(boba);
  }
}
//create a boba
router.post = async (req, res) => {
  try {
    console.log(req.body);
    const outBoba = {
      'boba_id': req.body.bobaid,
      'price': req.body.price,
      'drinkname': req.body.drinkname,
      'description': req.body.description,
    };
    await insertBoba(outBoba);
    res.status(201).send(outBoba);
  } catch (err) {
    console.error(err.message);
    res.status(404).send();
  }
}

//update a boba

//delete a boba

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//-- ROUTE HANDLERS---------------------------
selectBoba = async() => {
  const select = 'SELECT * FROM boba_entries'
  const {rows} = await pool.query(select);
  return rows;
};

selectID = async(boba_id) => {
  const select = 'SELECT * FROM boba_entries WHERE boba_id = $1';
  const query = {
    text: select,
    values: [boba_id],
  };

};

insertBoba = async(boba) => {
  const insert = 'INSERT INTO boba_entries(boba_id, price, drinkname, description) VALUES ($1, $2, $3, $4)';
  const query = {
    text: insert,
    values: [boba.boba_id, boba.price, boba.drinkname, boba.description]
  };
  await pool.query(query);  
};

module.exports = router;
