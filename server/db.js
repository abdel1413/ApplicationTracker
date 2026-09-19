const {Pool} = require("pg")

const pool = new Pool({
    host:'localhost',
    port: 5432,
    database: 'job_tracker',
    user:'aboulayetchakoura' 
});


module.exports = pool;