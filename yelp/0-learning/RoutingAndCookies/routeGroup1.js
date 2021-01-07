const express = require("express");
// #1 - First Create a router that lets you use different files to organize your routes
const router = express.Router();

// #2 - Create your routes using `router.` instead of `app.`
router.get("/parks", (req, res) => {
  res.send("You reached parks directory");
});

router.post("/parks", (req, res) => {
  res.send("Submitted POST and created new park");
});

router.get("/parks/:id", (req, res) => {
  res.send("You are LOOKING at a SINGLE park");
});

router.put("/parks/:id", (req, res) => {
  res.send("Submitted a PUT and you are EDITING a SINGLE park");
});

router.delete("/parks/:id", (req, res) => {
  res.send("Submitted a DELETE and you are DELETING a SINGLE park");
});

// #3 - Export the router to use in the main app index.js file
module.exports = router;
