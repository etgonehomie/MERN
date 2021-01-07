const express = require("express");
// #1 - First Create a router that lets you use different files to organize your routes
const router = express.Router();

// #2 - Create your routes using `router.` instead of `app.` and do not include the 'reviews' prefix
router.get("/", (req, res) => {
  res.send("You reached reviews directory");
});

router.post("/", (req, res) => {
  res.send("Submitted POST and created new review");
});

router.get("/:id", (req, res) => {
  res.send("You are LOOKING at a SINGLE review");
});

router.put("/:id", (req, res) => {
  res.send("Submitted a PUT and you are EDITING a SINGLE review");
});

router.delete("/:id", (req, res) => {
  res.send("Submitted a DELETE and you are DELETING a SINGLE review");
});

// #3 - Export the router to use in the main app index.js file
module.exports = router;
