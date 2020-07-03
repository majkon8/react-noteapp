const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  title: String,
  content: String,
  tags: String,
  lastUpdate: String
});

module.exports = mongoose.model("Notes", NoteSchema);
