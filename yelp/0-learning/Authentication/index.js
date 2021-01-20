// #0 - Boilerplate to setup express app to accept encrypting/decrypting
const express = require("express");
const session = require("express-session");
const User = require("./User");
const app = express();
const bcrypt = require("bcrypt");

const sessionOptions = {
  secret: "thisIsMySecretSignage",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOptions));

app.set("view engine", "ejs");
app.set("views", "views");

// #1 - Hash a plaintext password and then store this in the DB
const hashedPassword = async (plaintext) => {
  const hashed = await bcrypt.hash(plaintext, 12);
  console.log(plaintext);
  console.log(hashed);
  return hashed;
};

// #2 - Compare an input to the stored password
const verifyPassword = async (plaintext, hashed) => {
  const isSame = await bcrypt.compare(plaintext, hashed);
  if (isSame) {
    return console.log("successful");
  }
  console.log("not verified");
};

// #3 Shows how the encryption and decryption works
hashedPassword("monkey"); // hashed for this is $2b$12$TchLbK.DMEPoefIdejixVO45bC2IkXMMT/r6vPiFSAiIlzRR7jrv2

// True
verifyPassword(
  "monkey",
  "$2b$12$TchLbK.DMEPoefIdejixVO45bC2IkXMMT/r6vPiFSAiIlzRR7jrv2"
);

// false
verifyPassword(
  "Monkey",
  "$2b$12$TchLbK.DMEPoefIdejixVO45bC2IkXMMT/r6vPiFSAiIlzRR7jrv2"
);

// routes
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {});

app.listen("3000", () => {
  console.log("You are listening on Port# 3000");
});
