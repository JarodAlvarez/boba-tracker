const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "B0ba8472!!",
    database: "aws_bobabase",
    host: "bobabase-aws.chyxfte2ecdp.us-east-2.rds.amazonaws.com",
    port: 5432,
});

module.exports = pool;