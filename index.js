const express = require("express");
const app = express();
const cors = require("cors");
// const Pool = require("pg").Pool;
const path = require("path");
require('dotenv').config()

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

console.log(process.env.PG_DATABASE);

// const pool = new Pool({
//     user: process.env.PG_USER,
//     // password: process.env.PG_PASSWORD,
//     // host: process.env.PG_HOST,
//     // port: process.env.PG_PORT,
//     // database: process.env.PG_DATABASE
//   });

// // console.log(devConfig);

// const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

// const pool = new Pool({
//  devConfig,
// });

// app.get("/test", async (req, res) => {
//     console.log("test");
//   try {
//     client.query('SELECT * FROM test;', (err, res) => {
//       if (err) throw err;
//       for (let row of res.rows) {
//         res.json(JSON.stringify(row));
//         console.log(JSON.stringify(row));
//       }
//       client.end();
//     });
    
//     // const test = await pool.query("SELECT * FROM test");
//     // res.json(test.rows);
//   } catch (err) {
//     console.log(err.message);
//   }
// });

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: {
      rejectUnauthorized: false,
  },
})

console.log(process.NODE_ENV);

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.query('SELECT * FROM test', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

client.connect();


