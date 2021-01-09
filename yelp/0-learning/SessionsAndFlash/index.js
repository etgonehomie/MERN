const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");

const app = express();

// Set view Engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

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

// #2 FLASH MESSAGES
//    USAGE - Used to flash a message on the HTML screen,
//    but once page is refreshed, it goes away.
//    Now all requests have a req.flash() function that can be used to flash messages
const flash = require("connect-flash");
app.use(flash());

// #5 - RES LOCALS
//    A way to use middleware to add a variable to every request
app.use((req, res, next) => {
  res.locals.messages = req.flash("success");
  next();
});

// #4 - SESSION / FLASH USAGE
//      Get data from session and use it in request
//      Pretending that this request adds another item to the sessions shopping cart
app.get("/cart", (req, res) => {
  res.render("carts", {
    numberOfItems: req.session.cartItems,
  });
});

// #6 - RES LOCAL REPLACED THIS
//    Instead of sending the messages var in every request, you can just create
//    a res.locals variable called 'res.locals.messages' which is passed through
//    for EVERY res (aka result)
app.get("/cartOld", (req, res) => {
  res.render("carts", {
    numberOfItems: req.session.cartItems,
    messages: req.flash("success"),
  });
});

// #3 SESSION / FLASH DATA SETTING
//    Set data in the session by just using the . (dot) notation
//    Set data in flash using req.flash("key", "value")
//    The key for flash messages are usually "success", "info", "error", "warning"
app.get("/cart/addItem", (req, res) => {
  if (req.session.cartItems) {
    req.session.cartItems++;
  } else {
    req.session.cartItems = 1;
  }
  req.flash("success", "Added 1 more item!");
  res.redirect("/cart");
});

app.get("/cart/removeItems", (req, res) => {
  req.session.cartItems = 0;
  res.redirect("/cart");
});

// Listen to any requests to the server
app.listen("3000", () => {
  console.log(`Listening on server Port# 3000`);
});
