const {Pool} = require("pg")
require("dotenv").config()

// const pool = new Pool({
//     host:process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME,
//     user:process.env.DB_USER,
// });

const pool = new Pool({connectionString: process.env.DATABASE_URL})

module.exports = pool;