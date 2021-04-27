const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "", //LOCAL PASSWORD HERE
    database: "", //LOCAL DATABASE GOES HERE
    host: "localhost",
    port: 5432,
});
/*
exports.insertBoba = async (index) => {
    const insert = 'INSERT INTO boba_entries(bobaid, price, drinkname, description) VALUES $4';
    const query = {
        text: insert,
        values: [bobaid, ]
    }
}*/

module.exports = pool;