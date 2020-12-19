const express = require("express");
const app = express();

/**
 * Middlewares are code that has access to both the request and response object.
 * The main function of middleware is to perform some function on the data before the server receives it.
 * At PG&E we used middleware to just transform data from one format to another or just as a passthrough with user authentication
 * Can also use middleware to authenticate not only user but the data.
 */

/**
 * 1st way to use a middleware is to download a separate npm package.
 * morgan npm is an example shown below
 * This will output the request details in the console log dependant on the string parameter defined 'tiny', 'dev', 'common', etc. (look at the docs)
 */
const morgan = require("morgan");
app.use(morgan("dev"));

/**
 * 2nd way to use middleware is to define your own.
 * Use the next() function parameter at the end of the call to ensure that
 * the program will look for the next function (aka route to hit)
 * In this case, I create a middleware that adds a variable `createDate`
 * to the req object so that every request has the field of when it was created
 * so we can add it to the database
 */
app.use((req, res, next) => {
  req.createDate = Date.now();
  next();
});

/**
 * 3rd way to use middleware is to specify a pattern URL for which a middleware
 * should be utilized for. Maybe for all searches you want to know the geolocation
 * Therefore, this would get called for "/query" route, but not for "/" route
 */
app.use("/query", (req, res, next) => {
  req.location = "long/lat location";
  console.log("you hit the query middleware and found location");
  next();
});

/**
 * 4th way to use middleware is within the route directly.
 * Each app.use/get/post, etc. has three params, where the 2nd (usually omitted)
 * parameter is middleware function to be called before the (req, res) is processed.
 * We can use this function directly in a route.
 * In this example I create an authentication middleware that ensures user has correct
 * access by if the query parameter pw="123abc" for the '/login' route only
 */
const verifyPassword = (req, res, next) => {
  const { pw } = req.query;
  if (pw === "123abc") {
    req.successMessage = "You successfully logged in the with worst password";
    return next();
  }
  res.send("You are not authenticated");
};

app.get("/", (req, res) => {
  const createDate = req.createDate;
  res.send(`You got the home!! and request was on ${createDate}`);
});

app.get("/query", (req, res) => {
  res.send(`You queried from location ${req.location}`);
});

app.get("/login", verifyPassword, (req, res) => {
  res.send(`You made it into the login screen! ${req.successMessage}`);
});

app.listen("3000", () => {
  console.log("Listening on port 3000");
});
