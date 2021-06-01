const supertest = require('supertest');
const http = require('http');

// const db = require('./db');
const app = require('../app');

let server;

const {Pool} = require('pg');

const pool = new Pool({
  user: "postgres",
  password: "B0ba8472!!",
  database: "aws_bobabase",
  host: "bobabase-aws.chyxfte2ecdp.us-east-2.rds.amazonaws.com",
  port: 5432,
});


beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
});

afterAll((done) => {
  server.close(done);
});

test('GET Invalid URL', async () => {
  await request.get('/v0/so-not-a-real-end-point-ba-bip-de-doo-da/')
    .expect(404);
});

test('GET All', async () => {
  await request.get('/v0/boba/')
    .expect(200);
});
