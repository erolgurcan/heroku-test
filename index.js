const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const { Pool } = require("pg");

const connectStr = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectStr
});

try {
  console.log(pool);
} catch (error) {
  error.message;
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));


app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});

