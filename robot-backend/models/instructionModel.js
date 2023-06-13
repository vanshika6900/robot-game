const mongoose = require("mongoose");

const instructionSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  instruction: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Instruction", instructionSchema);
