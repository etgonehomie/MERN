const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const c = require("./constants");
const NationalPark = require("./models/nationalParkModel");
const methodOverride = require("method-override");
const app = express();

// Set view Engine
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
app.get("/national-parks", async (req, res) => {
  const parks = await NationalPark.find({});
  res.render("national-parks/home", { parks });
});

// Create a new park
app.get("/national-parks/new", (req, res) => {
  res.render("national-parks/create");
});

app.post("/national-parks", async (req, res) => {
  const { title, location } = req.body;
  const park = new NationalPark({
    title: title,
    location: location,
  });
  await park.save();
  res.redirect("/national-parks");
});

// Display Park details
app.get("/national-parks/:id", async (req, res) => {
  const { id } = req.params;
  const park = await NationalPark.findById(id);
  res.render("national-parks/show", { park });
});

// Edit existing Park details
app.get("/national-parks/:id/edit", async (req, res) => {
  const { id } = req.params;
  const park = await NationalPark.findById(id);
  res.render("national-parks/edit", { park });
});

app.put("/national-parks/:id", async (req, res) => {
  console.log("reached PUT route");
  const { id } = req.params;
  const { title, location } = req.body;
  const update = {
    title: title,
    location: location,
  };
  const options = { new: true };
  const park = await NationalPark.findByIdAndUpdate(id, update, options);
  res.render("national-parks/show", { park });
});

// Delete existing park
app.delete("/national-parks/:id", async (req, res) => {
  const { id } = req.params;
  const park = await NationalPark.findByIdAndDelete(id);
  res.redirect("/national-parks");
});

// Listen to any requests to the server
app.listen(c.serverPort, () => {
  console.log(`Listening on server Port# ${c.serverPort}`);
});
