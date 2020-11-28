// NOTE: 'redirect' = redirect to a different URL
// NOTE: 'render' = render an ejs filepath in 'views' folder

// Set up boilerplate for express app
const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.listen("3000", () => {
  console.log("listening on port 3000");
});

// #0 Add UUID package
// Create a new UUID with uuid()
let items = [];

// #1 Allow parsing of data from post requests
// allows parsing of default <form> tag data
app.use(express.urlencoded({ extended: true }));
// allows parsing of json data from any post request that is not in a <form> tag
app.use(express.json());

// #2 req.body is where the data from a <form> tag resides in key-value pairs
// the name of the input is the key
app.post("/items", (req, res) => {
  const { itemName, quantity, price } = req.body;
  const item = {
    id: uuid(),
    name: itemName,
    unitPrice: price,
    stock: quantity,
  };
  items.push(item);
  res.redirect("/items");
});

// Page to list items
app.get("/items", (req, res) => {
  res.render("items/list", { items });
});

// Page to create new items
app.get("/items/new", (req, res) => {
  res.render("items/create");
});

// Page to show item
app.get("/items/:id", (req, res) => {
  const { id } = req.params;
  const { _method: requestType } = req.body;
  // TODO: Understand why i cant use a seperate private function to return the item.
  const item = items.find((i) => i.id === id);
  if (item) {
    res.render("items/show", { ...item });
  } else {
    res.render("error");
  }
});

// #3 patch request is to update comments
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
// Show the edit page
app.get("/items/:id/edit", (req, res) => {
  const { id } = req.params;
  const item = items.find((i) => i.id === id);
  if (item) {
    res.render("items/edit", { ...item });
  } else {
    res.render("error");
  }
});

// Update from the edit page
app.patch("/items/:id/edit", (req, res) => {
  const { id } = req.params;
  const { quantity, price } = req.body;
  const item = items.find((i) => i.id === id);
  if (item) {
    item.stock = quantity;
    item.unitPrice = price;
    res.redirect("/items");
  } else {
    res.render("error");
  }
});

// #3 Delete request
app.get("/items/:id/delete", (req, res) => {
  const { id } = req.params;
  items = items.filter((item) => item.id !== id);
  console.log(items);
  console.log("deleted item");
  res.redirect("/items");
});

app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  items = items.filter((item) => item.id !== id);
  console.log("deleted item");
  res.redirect("/items");
});

// Set up home page
app.get("/", (req, res) => {
  res.redirect("/items");
});

function findItem(id) {
  const item = items.find((item) => {
    console.log(item);
    console.log(item.id);
    console.log(id);
    item.id === id;
  });
  console.log(`found item in function ${item}`);
  return item;
}
