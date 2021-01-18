const mongoose = require("mongoose");
const NationalPark = require("./NationalParkModel");
const Schema = mongoose.Schema;

const validRatings = [1, 2, 3, 4, 5];

const reviewSchema = new Schema({
  title: String,
  rating: {
    type: Number,
    enum: validRatings,
  },
  description: String,
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = { Review, validRatings };
