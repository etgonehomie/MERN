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

// allows parsing of json data from any post request that is not in a <form> tag
app.use(express.json());

// allows parsing of default <form> tag data
app.use(express.urlencoded({ extended: true }));

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

// Post the newly created item to database
app.post("/items", (req, res) => {
  const { name, category, tags, price } = req.body;
  const tagsArray = tags ? tags.replace(/\s/g, "").split(",") : [];
  const product = new Product({
    name: name,
    category: category,
    tags: tagsArray,
    price: price,
  });
  console.log("Product Created Successfully!");
  console.log(product);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.render("/items/create", { err });
    });
});

// Get the index page for all items
app.get("/", async (req, res) => {
  res.redirect("/items");
});

// Present Create new item page
app.get("/items/new", (req, res) => {
  res.render("items/create");
});

// Get unique item details page
app.get("/items", async (req, res) => {
  const products = await Product.find({});
  res.render("items/home", { products });
});

app.get("/items-data", async (req, res) => {
  const products = await Product.find({});
  res.json({ products });
});

app.get("/items-data/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.json({ product });
});

// DISPLAY ITEM
app.get("/items/:id", async (req, res) => {
  const { edit } = req.query;
  const { id } = req.params;
  const isEditMode = edit ? true : false;
  const detailedClassName = isEditMode ? "edit-detailed" : "display-detailed";
  console.log(`className = ${detailedClassName}`);

  try {
    const product = await Product.findById(id);
    const tags = product.tags;
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

// PATCH METHOD
app.patch("/items/:id", async (req, res) => {
  console.log("entered patch method");
  const { id } = req.params;
  const { price, category, tags } = req.body;
  const tagsArray = tags ? tags.replace(/\s/g, "").split(",") : [];
  console.log(typeof tagArray);

  try {
    const product = await Product.findById(id);
    product.price = price;
    product.category = category;
    product.tags = tagsArray;
    product.save();
    console.log(product);
    console.log("Updated PATCH");
    res.end("Updated successfully");
  } catch (err) {
    console.log(err);
    res.render("error");
  }
});

// Delete item
app.delete("/items/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    console.log("deleted successfully");
    res.redirect("/");
  } catch (err) {
    console.log("Could not find the product to delete");
    console.log(err);
  }
});

// Default any page not available to the error page
app.use((req, res) => {
  res.render("error");
});

app.listen(c.serverPort, () => {
  console.log(`Listening on server Port# ${c.serverPort}`);
});
