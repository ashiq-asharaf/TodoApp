const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: process.env.USERNAME2,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'todoapp'
})

pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error connecting to the database: ', err);

    }
    console.log('Connected to the database!');
    // release(); // Release the client back to the pool
  });
module.exports = pool;