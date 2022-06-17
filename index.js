const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require('dotenv').config()
const PORT = process.env.PORT || 5000;
const {Pool} = require('pg');

const connectStr = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: connectStr,
    ssl: true
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

console.log(process.env);

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});


app.get("/test", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM test");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});



