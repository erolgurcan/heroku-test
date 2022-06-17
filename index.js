const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const { Pool } = require("pg");

const connectStr = process.env.DATABASE_URL;

const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

client.query("select * from test;", (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    
    console.log("..." + JSON.stringify(row));
  }
  client.end();
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});

app.get("/test", (req, res) => {
  try {
    const get = async function () {
      const allTodos = await pool.query(
        "SELECT * FROM test"
      );
      res.json(allTodos.rows);
    };
    get();
  } catch (error) {
    console.log(err.message);
  }
})
