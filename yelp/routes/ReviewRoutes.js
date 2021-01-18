const express = require("express");
const router = express.Router({ mergeParams: true });
const flash = require("connect-flash");
const catchAsync = require("../utilities/catchWrapper");
const {
  reviewValidationSchema,
} = require("../models/Validations/ReviewValidationSchema");
const NationalPark = require("../models/NationalParkModel");
const { Review, validRatings } = require("../models/ReviewModel");

// Validate the review
const reviewValidation = (req, res, next) => {
  console.log(req.body);
  const { error } = reviewValidationSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    console.log(`error msg: ${msg}`);
    console.log(req.body);
    throw new ExpressError("SchemaError", msg);
  }
  next();
};

// Save the new review
router.post(
  "/",
  reviewValidation,
  catchAsync(async (req, res) => {
    const { park_id } = req.params;
    const park = await NationalPark.findById(park_id);
    const review = new Review(req.body.review);
    park.reviews.push(review._id);
    await park.save();
    await review.save();
    req.flash("success", `Added new ${review.rating} star review.`);
    res.redirect(`/national-parks/${park._id}`);
  })
);

// Edit review page
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const review = await Review.findById(id);
    res.render("../views/reviews/edit", { review, validRatings });
  })
);

router.put(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const options = { new: true, useFindAndModify: false };
    const review = await Review.findByIdAndUpdate(id, req.body.review, options);
    res.redirect("/national-parks");
  })
);

// Delete review
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { park_id, id } = req.params;

    likes: {
      $in: ["vaporizing", "talking"];
    }
    const park = await NationalPark.findByIdAndUpdate(park_id, {
      $pull: { reviews: id },
    });
    console.log(park);
    await Review.findByIdAndDelete(id);
    console.log("successfully deleted review");
    req.flash("success", `Deleted your review.`);
    res.redirect(`/national-parks/${park_id}`);
  })
);

module.exports = router;
