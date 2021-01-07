const express = require("express");
const router = express.Router();

// #6 - Can create a middleware that only applies to this group of routes

// This middleware looks for "?isAdmin=lasjd;ls" in the url in order to pass through and evaluate
router.use((req, res, next) => {
  if (req.query.isAdmin) {
    return next();
  }
  res.send("Your are NOT authorized");
});

router.get("/users", (req, res) => {
  res.send("You have accessed ALL USERS");
});

router.get("/passwords", (req, res) => {
  res.send("You can see ALL passwords");
});

router.get("/users/:id", (req, res) => {
  res.send("You are LOOKING at a SINGLE users data");
});

module.exports = router;
