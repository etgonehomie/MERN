const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const {
  parkValidationSchema,
} = require("./models/Validations/ParkValidationSchema");
const {
  reviewValidationSchema,
} = require("./models/Validations/ReviewValidationSchema");
const c = require("./constants");
const NationalPark = require("./models/NationalParkModel");
const { Review, validRatings } = require("./models/ReviewModel");
const methodOverride = require("method-override");
const app = express();
const ExpressError = require("./models/ExpressError");
const catchAsync = require("./utilities/catchWrapper");

// Set view Engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Allow serving of static files for templates to use
app.use(express.static(path.join(__dirname, "/public")));

// Defines what data the server can parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Boiler plate for Mongoose
mongoose
  .connect(`mongodb://localhost:${c.databasePort}/${c.databaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connection Success: ${c.displayDatabaseHeader()} open`);
  })
  .catch((e) => {
    console.log(`Connection Failure: ${c.displayDatabaseHeader()}`);
    console.log(
      `Ensure the mongo db is started using terminal alias cmd 'dbstart'`
    );
    console.log(`Error: ${e}`);
  });

// Get the index page for National Parks
app.get("/", (req, res) => {
  res.redirect("/national-parks");
});

app.get("/national-parks", async (req, res) => {
  const parks = await NationalPark.find({});
  res.render("national-parks/home", { parks });
});

// Create a new park
app.get("/national-parks/new", (req, res) => {
  res.render("national-parks/create");
});

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

app.post(
  "/national-parks",
  parkValidation,
  catchAsync(async (req, res) => {
    console.log("saving new park now");
    const park = new NationalPark(req.body.park);
    await park.save();
    res.redirect("/national-parks");
  })
);

// Display Park details
app.get(
  "/national-parks/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const park = await NationalPark.findById(id).populate("reviews");
    res.render("national-parks/show", { park });
  })
);

// Edit existing Park details
app.get(
  "/national-parks/:id/edit",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const park = await NationalPark.findById(id);
    res.render("national-parks/edit", { park });
  })
);

app.put(
  "/national-parks/:id",
  parkValidation,
  catchAsync(async (req, res) => {
    console.log("reached PUT route");
    const { id } = req.params;
    const inputtedPark = req.body.park;
    const options = { new: true };
    const park = await NationalPark.findByIdAndUpdate(
      id,
      inputtedPark,
      options
    );
    res.render("national-parks/show", { park });
  })
);

// Delete existing park
app.delete(
  "/national-parks/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const park = await NationalPark.findByIdAndDelete(id);
    res.redirect("/national-parks");
  })
);

// COMMENT ROUTES

// Create a new review
app.get(
  "/national-parks/:park_id/reviews/new",
  catchAsync(async (req, res) => {
    const { park_id } = req.params;
    const park = await NationalPark.findById(park_id);
    console.log(park);
    res.render("reviews/create", { park, validRatings });
  })
);

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
app.post(
  "/national-parks/:park_id/reviews",
  reviewValidation,
  catchAsync(async (req, res) => {
    const { park_id } = req.params;
    const park = await NationalPark.findById(park_id);
    const review = new Review(req.body.review);
    park.reviews.push(review._id);
    await park.save();
    await review.save();
    console.log("this is the new review:");
    console.log(review);
    console.log("this is the new park:");
    console.log(park);
    res.redirect(`/national-parks/${park._id}`);
  })
);

// Edit review page
app.get(
  "/reviews/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const review = await Review.findById(id);
    res.render("reviews/edit", { review, validRatings });
  })
);

app.put(
  "/reviews/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const options = { new: true };
    const review = await Review.findByIdAndUpdate(id, req.body.review, options);
    res.redirect("/national-parks");
  })
);
// Error handling
app.use("*", (req, res, next) => {
  next(new ExpressError("NoPageFoundError"));
});

app.use((err, req, res, next) => {
  console.log(`Error Name: ${err.name}`);
  console.log(err.stack);
  err = new ExpressError(err.name, err.message);
  res.render("error", { err });
});
// Listen to any requests to the server
app.listen(c.serverPort, () => {
  console.log(`Listening on server Port# ${c.serverPort}`);
});
