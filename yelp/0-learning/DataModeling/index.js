const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const { FarmStand, Produce, produceCategories } = require("./schemas");

// Mongoose Boilerplate
mongoose
  .connect("mongodb://localhost:27017/farmStandDemo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

// Express Boilerplate
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Homepage for products
app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category && produceCategories.includes(category)) {
    const products = await Produce.find({ category });
    res.render("products/index", { products, category });
  }
  const products = await Produce.find({});
  res.render("products/index", { products, category: "All" });
});

// Create a new product
app.get("/products/new", (req, res) => {
  res.render("products/new", { produceCategories });
});

app.post("/products", async (req, res) => {
  const newProduct = new Produce(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

// Display a product
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Produce.findById(id);
  if (product) {
    res.render("products/show", { product });
  }
});

// Update a product
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Produce.findById(id);
  if (product) {
    res.render("products/edit", { product, produceCategories });
  }
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

// Delete a product
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});
