const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

mongoose.connect("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB database...");
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, World");
});

const QuotesRoute = require("./routes/Quotes");

app.use("/quotes", QuotesRoute);

app.listen(3000, console.log("Listening on port 3000"));
