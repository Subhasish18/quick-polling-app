const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
  question: String,
  options: [{ text: String, votes: Number }],
  duration: Number, 
  status: { type: String, default: "active" }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Poll", PollSchema);
