const express = require("express");
const path = require("path");
// #1 Set up express app
const app = express();
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// #2 Add EJS as the templating language. Do not need to require the package as express package does this automatically with the set view engine method below
app.set("view engine", "ejs");

// #3 The path package allows to set the view directory to a static, so you can get the views even if you're not calling the server from the same directory that the ejs views are in
// __dirname = the path at which the file that contains the __dirname variable exists.
app.set("views", path.join(__dirname, "/views"));

// #4 Use the res.render function to render an ejs file. It will default render from the 'views' folder, or whatever default you set
app.get("/", (req, res) => {
  res.render("home");
});
