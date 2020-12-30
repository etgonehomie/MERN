const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const { parkSchema } = require("./models/Validations/ParkSchema");
const c = require("./constants");
const NationalPark = require("./models/nationalParkModel");
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

app.post(
  "/national-parks",
  catchAsync(async (req, res) => {
    // res.send(req.body);
    console.log(`validated now....`);
    const { error } = parkSchema.validate(req.body);
    console.log(`validated with error: ${error}`);
    if (error) {
      console.log("throwing error right now");
      const msg = error.details.map((el) => el.message).join(",");
      console.log(`error msg: ${msg}`);
      throw new ExpressError("SchemaError", msg);
    }
    console.log("saving new park now");
    const park = new NationalPark(req.body);
    await park.save();
    res.redirect("/national-parks");
  })
);

// Display Park details
app.get(
  "/national-parks/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const park = await NationalPark.findById(id);
    console.log(`found id of ${id}`);
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
  catchAsync(async (req, res) => {
    console.log("reached PUT route");
    const { id } = req.params;
    const inputtedPark = req.body;
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

// Error handling
app.use("*", (req, res, next) => {
  next(new ExpressError("NoPageFoundError"));
});

app.use((err, req, res, next) => {
  console.log(`Error Name: ${err.name}`);
  err = new ExpressError(err.name);
  res.render("error", { err });
});
// Listen to any requests to the server
app.listen(c.serverPort, () => {
  console.log(`Listening on server Port# ${c.serverPort}`);
});
