const { json } = require("express");
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

// #5 Can pass in key,value pairs as send param in the render function for ejs file to utilize
app.get("/rand", (req, res) => {
  const item = "book";
  const price = 4.59;
  res.render("rand", { itemName: item, itemPrice: price });
});

// #6 Can destructure request params to utilize in the repsonse (or for querying data)
// Parameters from request are anything that start with a '/:'
app.get("/item/:itemType", (req, res) => {
  const { itemType } = req.params;
  res.render("item", { itemType });
});

// #7 Conditionals and Looping in EJS
app.get("/looping", (req, res) => {
  const array = [1, 2, 3, 10, 25, 3, 5, 30, 923, 9, 82, 127, 18, 52, , 63];
  res.render("looping", { array });
});

// #8 Use a data model to utilize in the ejs files
// Spreading the data so we dont have to do jsonData.* to acces the vars within the object. we can just access the var by * directly.
const jsonData = require("./models/data.json");
app.get("/json/:index", (req, res) => {
  const { index } = req.params;
  res.render("json", { ...jsonData[index] });
});

app.get("/json/get?", (req, res) => {
  const randomNumber = Math.floor(Math.random() * (jsonData.length - 1));
  console.log(`random number is: ${randomNumber}`);
  res.redirect(`/json/${randomNumber}`);
});

// # 9 - Serving static files for the browser to use
// For example, after you serve an EJS file, you want to serve JS, CSS files that when the user interacts with the HTML, it will draw logic and styling from the statically served JS/CSS files
// This will serve all the files within the public directory
// Can now reference any of the files within the public folder directly in any ejs/html file like I normally would.
app.use(express.static(path.join(__dirname, "/public")));

// #9 Default for fall through
app.get("/*", (req, res) => {
  res.render("error");
});

// Use EJS tags within the ejs files to run JS
// https://ejs.co/#install
/** EJS Tags
 * Starting Tags
  <% 'Scriptlet' tag, for control-flow, no output
  <%_ ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it
  <%= Outputs the value into the template (HTML escaped)
  <%- Outputs the unescaped value into the template
  <%# Comment tag, no execution, no output
  <%% Outputs a literal '<%'

 * Ending Tags
  %> Plain ending tag
  -%> Trim-mode ('newline slurp') tag, trims following newline
  _%> ‘Whitespace Slurping’ ending tag, removes all whitespace after it
 */
