const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
dotenv.config({ path: "./config/config.env" });
const connnectDB = require("./config/db");

connnectDB();

const transactions = require("./routes/transactions");

const app = express();

app.use(express.json());
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/transactions", transactions);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("expense-tracker/build"));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "expense-tracker", "build", "index.html")
    )
  );
}

const PORT = process.env.PORT || 5000;

app.listen(
  5000,
  console.log(
    `Server running in ${process.env.NODE_ENV} node on port ${PORT}`.yellow.bold
  )
);
