// NPM Imports
const express = require("express");

/// Setting up the express server

// 1. Creates a stagnant server
const app = express();

// 2. Allows the server to receive requests for a specific 'lane' (aka port). Basically allows the server to be utilized
// CTRL + C to stop the server from listening
const portNumber = 3000; // 3000 and 8080 are local hosts
app.listen(portNumber, () => {
  console.log(`Listening on Port#${portNumber}`);
});

// 3. This function is called for ANY income request to the server. An incoming request is for example, going to a specific webpage, or clicking a button to navigate somewhere.
// The `req` request is the incoming request, basically th e http request in our case
// The `res` response is what the server passes back to the client to utilize
app.use((req, res) => {
  console.log("Request made to server");
  // console.dir(req);
  res.send(`Hello, server ${portNumber} received your request`);
});
