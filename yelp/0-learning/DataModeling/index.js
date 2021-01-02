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

// Homepage for farms
app.get("/farms", async (req, res) => {
  const farms = await FarmStand.find();
  res.render("farms/index", { farms });
});

// Create a farm
app.get("/farms/new", (req, res) => {
  res.render("farms/new");
});

app.post("/farms", async (req, res) => {
  const newFarm = new FarmStand(req.body.farm);
  newFarm.produce = [];
  await newFarm.save();
  res.redirect(`/farms/${newFarm._id}`);
});

// Display a farm
app.get("/farms/:id", async (req, res) => {
  const { id } = req.params;
  const farm = await FarmStand.findById(id).populate("produce");
  res.render("farms/show", { farm });
});

// Delete a farm
// The schmea.js middleware will delete the associated produce in this commit
app.delete("/farms/:id", async (req, res) => {
  const { id } = req.params;
  const farm = await FarmStand.findById(id);
  await FarmStand.findByIdAndDelete(id);
  res.redirect("/farms");
});

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

// Create a new product for a specific farm
app.get("/farms/:farm_id/products/new", async (req, res) => {
  const { farm_id } = req.params;
  const farm = await FarmStand.findById(farm_id);
  res.render("products/new", { produceCategories, farm });
});

app.post("/farms/:farm_id/products", async (req, res) => {
  const { farm_id } = req.params;
  const farm = await FarmStand.findById(farm_id);
  const newProduct = new Produce(req.body.produce);
  newProduct.farmStand = farm._id;
  farm.produce.push(newProduct);
  await newProduct.save();
  await farm.save();
  console.log(farm);
  res.redirect(`/farms/${farm._id}`);
});

// Display a product
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Produce.findById(id);
  if (product) {
    res.render("products/show", { product });
  }
});

// Update a product for a specific farm
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Produce.findById(id);
  if (product) {
    res.render("products/edit", { product, produceCategories });
  }
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Produce.findByIdAndUpdate(id, req.body.produce, {
    runValidators: true,
    new: true,
  });
  await product.save();
  console.log(product);

  res.redirect(`/farms/${product.farmStand}`);
});

// Delete a product
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Produce.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000!");
});
