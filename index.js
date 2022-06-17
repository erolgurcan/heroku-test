const express = require("express");
const app = express();
const cors = require("cors");
const Pool = require("pg").Pool;
const path = require("path");
require('dotenv').config()

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

console.log(process.env.PG_DATABASE);

const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
  });

// console.log(devConfig);

app.get("/test", async (req, res) => {
    console.log("test");
  try {
    const test = await pool.query("SELECT * FROM test");
    res.json(test.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
