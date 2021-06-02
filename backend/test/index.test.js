const supertest = require('supertest');
const http = require('http');

// const db = require('./db');
const app = require('../app');

let server;

const {Pool} = require('pg');
var { request } = require('../app');

const pool = new Pool({
  user: "postgres",
  password: "B0ba8472!!",
  database: "aws_bobabase",
  host: "bobabase-aws.chyxfte2ecdp.us-east-2.rds.amazonaws.com",
  port: 5432,
});

beforeEach(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
});

afterEach((done) => {
  server.close(done);
});

test('GET Invalid URL', async () => {
  await request.get('/v0/so-not-a-real-end-point-ba-bip-de-doo-da/')
    .expect(404);
});


test('GET All', async () => {
  await request.get('/v0/boba/')
    .expect(200)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body[0]).toHaveProperty("purchase_date");
      expect(data.body[0]).toHaveProperty("drinkname");
      expect(data.body[0]).toHaveProperty("sweetness");
    })
});

test('GET All for one user', async () => {
  await request.get('/v0/boba/mlee140%40ucsc.edu')
    .expect(200)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body[0].email).toBe("mlee140@ucsc.edu");
      expect(data.body[0]).toHaveProperty("purchase_date");
      expect(data.body[0]).toHaveProperty("drinkname");
      expect(data.body[0]).toHaveProperty("sweetness");
      expect(data.body[0]).toHaveProperty("price");

    })
});

test('GET One Boba', async () => {
  await request.get('/v0/boba/32/32')
    .expect(200)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body[0].email).toBe("mlee140@ucsc.edu");
      expect(data.body[0]).toHaveProperty("purchase_date");
      expect(data.body[0]).toHaveProperty("drinkname");
      expect(data.body[0]["drinkname"]).toEqual('thai milk tea');
      expect(data.body[0]["price"]).toEqual(2);
      expect(data.body[0]).toHaveProperty("sweetness");
      expect(data.body[0]["sweetness"]).toBe(0.2);
      

    })
});


const bobaOrder = { 
  "purchase_date": "2021-06-02",
  "drinkname": "taro milk tea",
  "price": 4,
  "sweetness": 0.2,
  "email": "mlee140@ucsc.edu"
};

test("POST Boba", async () => {
  await request.post('/v0/boba')
  .send(bobaOrder)
  .set('Accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect(201)
  .then(data => {
    expect(data).toBeDefined();
    expect(data.body["purchase_date"]).toEqual(bobaOrder["purchase_date"]);
    expect(data.body["drinkname"]).toEqual(bobaOrder["drinkname"]);
    expect(data.body["price"]).toEqual(bobaOrder["price"]);
    expect(data.body["sweetness"]).toEqual(bobaOrder["sweetness"]);
    expect(data.body["email"]).toEqual(bobaOrder["email"]);
  })
});

test("POST Boba", async () => {
  await request.post('/v0/boba')
  .send(bobaOrder)
  .set('Accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect(201)
  .then(data => {
    expect(data).toBeDefined();
    expect(data.body["purchase_date"]).toEqual(bobaOrder["purchase_date"]);
    expect(data.body["drinkname"]).toEqual(bobaOrder["drinkname"]);
    expect(data.body["price"]).toEqual(bobaOrder["price"]);
    expect(data.body["sweetness"]).toEqual(bobaOrder["sweetness"]);
    expect(data.body["email"]).toEqual(bobaOrder["email"]);
  })
});

// const bobaUpdate = { 
//   "date": "2021-06-02",
//   "drink": "taro milk tea",
//   "price": 4,
//   "sweetness": 0.2
// };


// test("PUT / UPDATE Boba", async () => {
//   const bobaOrder = await request.get('/v0/boba');
//   const id = bobaOrder.body[2].id;
//   console.log(id);
//   await request.put("/v0/boba/25")
//   .send(bobaUpdate)
//   .expect(204);
// });


test('DELETE Boba', async () => {
  await request.delete('/v0/boba/32')
    .expect(200)
});
