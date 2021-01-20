const express = require("express");
const router = express.Router();
const flash = require("connect-flash");
const ejsParksDirectory = "../views/national-parks";
const ExpressError = require("../models/ExpressError");
const catchAsync = require("../utilities/catchWrapper");
const NationalPark = require("../models/NationalParkModel");
const { flashType } = require("../utilities/constants");

const {
  parkValidationSchema,
} = require("../models/Validations/ParkValidationSchema");

// Go to park directory
router.get("/", async (req, res) => {
  const parks = await NationalPark.find({});
  res.render(`${ejsParksDirectory}/home`, { parks });
});

// Validate park
const parkValidation = (req, res, next) => {
  const { error } = parkValidationSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    console.log(`error msg: ${msg}`);
    console.log(req.body);
    throw new ExpressError("SchemaError", msg);
  }
  next();
};

// Go to new park create page
router.get("/new", (req, res) => {
  res.render(`${ejsParksDirectory}/create`);
});

// Create new park
router.post(
  "/",
  parkValidation,
  catchAsync(async (req, res) => {
    console.log("saving new park now");
    const park = new NationalPark(req.body.park);
    await park.save();
    req.flash("success", "New park successfully created!");
    res.redirect("/national-parks");
  })
);

// Display Park details
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const park = await NationalPark.findById(id).populate("reviews");
    if (!park) {
      console.log("Park not found");
      req.flash(flashType.ERROR, {
        title: "Could not find park",
        message: "Not correct ID",
      });
      res.redirect("/national-parks");
    }
    res.render(`${ejsParksDirectory}/show`, { park });
  })
);

// Edit existing Park details
router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const park = await NationalPark.findById(id);
    res.render(`${ejsParksDirectory}/edit`, { park });
  })
);

router.put(
  "/:id",
  parkValidation,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const inputtedPark = req.body.park;
    const options = { new: true };
    const park = await NationalPark.findByIdAndUpdate(
      id,
      inputtedPark,
      options
    );
    res.render(`${ejsParksDirectory}/show`, { park });
  })
);

// Delete existing park
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const park = await NationalPark.findByIdAndDelete(id);
    req.flash(
      flashType.SUCCESS,
      "Successfully trashed the park into the abyss!!!"
    );
    res.redirect("/national-parks");
  })
);

module.exports = router;