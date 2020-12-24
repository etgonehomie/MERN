const express = require("express");
const app = express();

/**
 * This is a summary of how to use errors.
 * If you use an `app.use(err, req, res, next)` that will be used as the default error
 * You can use `next(err)` if you want the flow to continue to the next found error,
 * where the last found will be the express default error
 */
app.use((req, res, next) => {
  req.createDate = Date.now();
  next();
});

app.use("/query", (req, res, next) => {
  req.location = "long/lat location";
  console.log("you hit the query middleware and found location");
  next();
});

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
