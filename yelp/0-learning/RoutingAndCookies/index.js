const express = require("express");
const app = express();
const routeGroup1 = require("./routeGroup1");
const routeGroup2 = require("./routeGroup2");

// #4 - use the routes from the routeGroup1.js file I created
app.use("/", routeGroup1);

// #5 - can prefix all the routes from the file using something other than '/' for first param
app.use("/reviews", routeGroup2);

app.listen("3000", () => {
  console.log("Listening on server port# 3000");
});
