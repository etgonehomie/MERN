// NPM Imports
const express = require("express");

/// Setting up the express server

/**
 *  1. Creates a stagnant server
 */
const app = express();

/**
 * 2. Allows the server to receive requests for a specific 'lane' (aka port).
 * Basically allows the server to be utilized
 * CTRL + C to stop the server from listening
 */
const portNumber = 3000; // 3000 and 8080 are local hosts
app.listen(portNumber, () => {
  console.log(`Listening on Port#${portNumber}!!`);
});

/**
 * 3. Routing GET requests (aka url paths) to different logic branches
 * This means certain URLs have different logic
 */
app.get("/", (req, res) => {
  res.send("You are at the root (aka home) page.");
});

app.get("/portfolio", (req, res) => {
  res.send("You are at the portfolio page.");
});

// NOTE: Can add a variable to the GET route by using :
// The string after colon and before a slash will be the json parameter name that the variable can be deconstructed and accessed by.
app.get("/timeline/:year/:month", (req, res) => {
  const { year, month } = req.params;
  res.send(`You are at the timeline page for year ${year} and month ${month}.`);
});

// NOTE: Can add query strings and utilize them
// The `queryString` is the parameter in the URL that comes after the ? and before the =
// For example, the URL for the below would be
// www.example.com/find?queryString=findThisTerm&onPage=SillyPage
app.get("/find", (req, res) => {
  const { queryString, onPage } = req.query;
  res.send(`You searched for ${queryString} on page ${onPage}`);
});
/**
 * 4. Routing POST requests (aka url paths) to different logic branches
 */
app.post("/cats", (req, res) => {
  res.send("You posted a new cat comment.");
});

/**
 * 4. This function is called for ANY income request to the server.
 * An incoming request is for example, going to a specific webpage, or clicking a button to navigate somewhere.
 * The `req` request is the incoming request, basically th e http request in our case
 * The `res` response is what the server passes back to the client to utilize
 */
app.use((req, res) => {
  console.log("Request made to server");
  // console.dir(req);

  // NOTE: A request can only have 1 and only 1 response
  // Therefore, with a request always hitting the function send(), this will get called all the time and not be routed from the function get(), unless this goes at the bottom of the JS file (kind of like a default)
  res.send(`Hello, server ${portNumber} received your request`);
});

//
