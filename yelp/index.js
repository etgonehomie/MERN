const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const c = require("./utilities/constants");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const app = express();
const nationalParkRoutes = require("./routes/NationalParkRoutes");
const reviewRoutes = require("./routes/ReviewRoutes");
const ExpressError = require("./models/ExpressError");

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

app.use("/national-parks", nationalParkRoutes);
app.use("/national-parks/:park_id/reviews", reviewRoutes);

// Get the index page for National Parks
app.get("/", (req, res) => {
  res.redirect("/national-parks");
});

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
