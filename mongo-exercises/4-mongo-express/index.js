// Boilerplate for Express App
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const c = require("./constants");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.listen(c.serverPort, () => {
  console.log(`Listening on server Port#${c.serverPort}`);
});

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

// Testing a Get function
app.get("/", async (req, res) => {
  const products = await Product.find({});
  res.render("home", { products });
});
