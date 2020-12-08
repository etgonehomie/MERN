// Boilerplate for Express App
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const c = require("./constants");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Allow serving of static files for templates to use
app.use(express.static(path.join(__dirname, "/public")));

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

// Add needed models
const Product = require("./models/ProductModel");

// Get the index page for all items
app.get("/", async (req, res) => {
  res.redirect("/items");
});

// Get unique item details page
app.get("/items", async (req, res) => {
  const products = await Product.find({});
  res.render("items/home", { products });
});

app.get("/items/:id", async (req, res) => {
  const { edit } = req.query;
  const { id } = req.params;
  const isEditMode = edit ? true : false;
  const detailedClassName = isEditMode ? "edit-detailed" : "display-detailed";
  console.log(`className = ${detailedClassName}`);

  try {
    const product = await Product.findById(id);
    const tags = product.tag;
    res.render("items/detailed", {
      product,
      tags,
      detailedClassName,
      isEditMode,
    });
  } catch (err) {
    console.log(err);
    res.render("error");
  }
});

// Default any page not available to the error page
app.use((req, res) => {
  res.render("error");
});

app.listen(c.serverPort, () => {
  console.log(`Listening on server Port# ${c.serverPort}`);
});
