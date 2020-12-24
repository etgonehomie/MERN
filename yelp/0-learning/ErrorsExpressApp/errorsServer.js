const express = require("express");
const app = express();
const ExpressError = require("./expressError");
/**
 * EXPRESS (AKA SERVER) ERRORS:
 * This is a summary of how to use errors for server side.
 * If you use an `app.use(err, req, res, next)` that will be used as the default error
 * You can use `next(err)` if you want the flow to continue to the next found error,
 * where the last found will be the express default error.
 *
 * 1. If no custom error handler is found, express will use the default one where
 * it shows the stack trace.
 */

const verifyPassword = (req, res, next) => {
  const { pw } = req.query;
  if (pw === "123abc") {
    req.successMessage = "You successfully logged in the with worst password";
    return next();
  }

  /**
   * 1b. THROW ERROR:
   * You can throw an error anywhere, and it will be caught be the default
   * express error handler, or a custom one if you define it.
   * The `res` object has a status you can define when sending back a HTTP response
   * You can use the existing Error class, or extend the Error class to make your own.
   */
  res.status(401); // 401 = Unauthorized
  throw new Error("You are not authenticated to view this webpage!!!!!");
  // res.send("You are not authenticated");
};

/**
 * 3. CREATE ERROR CLASS:
 * You can create a custom error class and then throw that new error type.
 * I've created an error class called `ExpressError`
 */
app.get("/", (req, res) => {
  const createDate = req.createDate;
  throw new ExpressError("homepageNotFound");
  // res.send(`You got the home!! and request was on ${createDate}`);
});

app.get("/query", (req, res) => {
  res.send(`You queried from location ${req.location}`);
});

app.get("/login", verifyPassword, (req, res) => {
  res.send(`You made it into the login screen! ${req.successMessage}`);
});

/**
 * 2. CUSTOM ERROR HANDLER:
 *    - This must be at the bottom of all the routes
 * This is to use a catch all, for any error that comes into express
 * You can call the `next()` function (much like you do for middleware),
 * except if you pass in err like `next(err)`, flow will continue to the
 * next `app.use(err, req, res, next)` function or the default express
 * error handler if none is found
 */
app.use((err, req, res, next) => {
  console.log("*****************************************");
  console.log("**********You received an ERROR**********");
  console.log("*****************************************");
  next(err);
});
app.listen("3000", () => {
  console.log("Listening on port 3000");
});
