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
const items = [];

// #1 Allow parsing of data from post requests
// allows parsing of default <form> tag data
app.use(express.urlencoded({ extended: true }));
// allows parsing of json data from any post request that is not in a <form> tag
app.use(express.json());

app.get("/items", (req, res) => {
  //   res.send("Get items");
});

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
  res.render("item", { ...item });
});
