const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const { Pool } = require("pg");

const connectStr = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectStr,
  ssl: true,
});

try {
  console.log(connectionString);
} catch (error) {
  error.message;
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

console.log(process.env);

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});

exports.dbAction = function (req, res) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  pool.query("select * from exampleTable", (err, results) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.json(results.rows);
  });
};
