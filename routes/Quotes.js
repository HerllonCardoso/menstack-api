const express = require("express");
const router = express.Router();
const Quote = require("../models/Quotes");

router.get("/", async (req, res) => {
  const quotes = await Quote.find();

  res.json(quotes);
});

router.post("/new", async (req, res) => {
  const newQuote = new Quote(req.body);

  const savedQuote = await newQuote.save();

  res.json(savedQuote);
});

router.get("/get/:id", async (req, res) => {
  const q = await Quote.findById({ _id: req.params.id });

  res.json(q);
});

router.delete("/delete/:id", async (req, res) => {
  const result = await Quote.findByIdAndDelete({ _id: req.params.id });

  res.json(result);
});

router.patch("/update/:id", async (req, res) => {
  const q = await Quote.updateOne({ _id: req.params.id }, { $set: req.body });

  res.json(q);
});

router.get("/random", async (req, res) => {
  const count = await Quote.countDocuments();
  const random = Math.floor(Math.random() * count);
  const q = await Quote.findOne().skip(random);
  res.json(q);
});

module.exports = router;
