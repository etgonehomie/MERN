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

//TODO: Review model
/**
 * X 1. Create a GET ROUTE for a specific camground to create a new review
 * X 2. Create a VIEW for the NEW comment page input
 * X 3. Create a PUT ROUTE to save the NEW review
 * X 4. VALIDATE NEW/EDIT using a express JOI model
 * 4. Create a GET ROUTE to show the NEW review
 * 5. Create a VIEW to SHOW the new reivew
 * X 6. Create a GET ROUTE to EDIT the reveiw
 * X 7. Create a VIEW to EDIT the review
 * X 8. Create a PUT ROUTE to EDIT the reveiw
 * X 9. Create a DELETE ROUTE to DELETE the review
 */
