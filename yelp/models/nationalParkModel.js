const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParkSchema = new Schema({
  title: String,
  description: String,
  location: String,
  price: String,
});

module.exports = mongoose.model("Park", ParkSchema);
