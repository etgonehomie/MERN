const express = require("express");
const app = express();

// #1 - EXPRESS-SESSION
//      SESSION USE-CASE - SHORT TERM STORAGE
//      This is used to create a cache (so to speak), or a database on the server. ////      This is a totally independent from your main datastore such as mongoDB.
//      They are used mostly for data that only needs to persist for as long as a
//      user has the cookie key (aka session key).
//      For example, like a cart checkout.
//      SESSION ACCESS - Uses a COOKIE to access the data stored in the session
//      SESSION DATA - is more secure than cookies.
//      Default is stored in the browser memory, but usually use a different database
//      Example of a popular db for sessions is REDIS
const session = require("express-session");
const sessionOptions = {
  secret: "thisIsMySecretSignage",
  resave: true,
  saveUninitialized: true,
};
app.use(session(sessionOptions));

// #2 - Get data from session and use it in request
//      Pretending that this request adds another item to the sessions shopping cart
app.get("/cart/addItem", (req, res) => {
  if (req.session.cartItems) {
    req.session.cartItems++;
  } else {
    req.session.cartItems = 1;
  }
  res.send(`You know have ${req.session.cartItems} in your cart`);
});

// Listen to any requests to the server
app.listen("3000", () => {
  console.log(`Listening on server Port# 3000`);
});
