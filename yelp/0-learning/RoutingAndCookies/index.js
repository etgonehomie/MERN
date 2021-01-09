const express = require("express");
const app = express();
const routeGroup1 = require("./routeGroup1");
const routeGroup2 = require("./routeGroup2");
const routeGroupMiddleware = require("./routeGroupMiddleware");

// #8 COOKIE PARSER
const cookieParser = require("cookie-parser");
app.use(cookieParser("thisIsMySecretCookieSigner"));

// #4 - ROUTER WITHOUT PREFIX
//    use the routes from the routeGroup1.js file I created
app.use("/", routeGroup1);

// #5 - ROUTER WITH PREFIX
//    can prefix all the routes from the file using something other
//    than '/' for first param
app.use("/reviews", routeGroup2);

// #6 - ROUTER WITH SPECIFIC MIDDLEWARE
//    This route group has a middleware defined for this specific set
app.use("/admin", routeGroupMiddleware);

// #7 - SET COOKIE
//    This is a route to set cookies.
//    Express automatically allows cookies to be set
app.get("/setCookie", (req, res) => {
  res.cookie("cookieKey", "cookieValue");
  res.cookie("color", "black");
  res.send("Sent the cookies your way");
});

// #8 - COOKIE PARSER
//    Using the npm 'cookie-parser' it gives us another variable
//    in our req object called `req.cookies that we can deconstruct as normal
//    Remember, once a cookie is set, it is accessible across any route.
//    This is just one sample route!
app.get("/getCookie", (req, res) => {
  const { cookieKey, color } = req.cookies;
  res.send(
    `Got the cookies for: cookieKey = ${cookieKey} and color = ${color}`
  );
});

// #9 SIGNED COOKIE
//    A signed cookie is one that is hashed, so that when the cookie is
//    sent back to the server, we can validate the cookie has not been modified
//    using the secret key.
//    It is not about hiding the data, but make sure the data was not tampered
//    These are stored in 'req.signedCookies'
app.get("/setSignedCookie", (req, res) => {
  res.cookie("signedCookie", "password", { signed: true });
  res.send("Created signed cookie");
});

app.get("/verify", (req, res) => {
  const { signedCookie } = req.signedCookies;
  if (signedCookie) {
    res.send("Your cookie has not been tampered with");
  }
  res.send("YOU'VE BEEN HACKED!! Signed Cookie is different!!");
});

app.listen("3000", () => {
  console.log("Listening on server port# 3000");
});
