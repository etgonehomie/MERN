const mongoose = require("mongoose");
const { Review } = require("./ReviewModel");
const Schema = mongoose.Schema;

const ParkSchema = new Schema({
  title: String,
  description: String,
  location: String,
  imageURL: String,
  price: Number,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// Delete all the reviews if you delete a park
ParkSchema.post("findOneAndDelete", async function (park) {
  if (park.reviews.length) {
    const res = await Review.remove({ _id: { $in: park.reviews } });
    console.log("Deletion of Park successfully and deleted relevant reviews");
    console.log(res);
  }
});

module.exports = mongoose.model("Park", ParkSchema);
