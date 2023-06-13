const express = require("express");
const app = express();
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const instructionModel = require("./models/instructionModel");
const dotenv = require("dotenv").config();
app.use(cors());

app.get("/api/instruction/:symbol", async (req, res) => {
  const { symbol } = req.params;
  let instruction = "";
  if (symbol === "left") {
    instruction = "Left instruction is performed.";
  } else if (symbol === "up") {
    instruction = "Up instruction is performed.";
  } else if (symbol === "down") {
    instruction = "Down instruction is performed.";
  } else if (symbol === "right") {
    instruction = "Right instruction is performed.";
  } else {
    instruction = "Invalid symbol.";
  }
  const newInstruction = new instructionModel({
    symbol,
    instruction,
  });
  await newInstruction.save();
  console.log(newInstruction);

  res.json({ instruction });
});
connectDb();

app.listen(8080, () => {
  console.log("Server is on PORT 8080");
});
