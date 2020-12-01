// Boilerplate for Express App
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.listen("3000", () => {
  console.log("listening on port 3000");
});

// Boiler plate for Mongoose
const databaseName = "shop";
const databasePort = "27017";
mongoose
  .connect(`mongodb://localhost:${databasePort}/${databaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connection Success: ${displayDatabaseHeader()} open`);
  })
  .catch((e) => {
    console.log(`Connection Failure: ${displayDatabaseHeader()}`);
    console.log(
      `Ensure the mongo db is started using terminal alias cmd 'dbstart'`
    );
    console.log(`Error: ${e}`);
  });

const displayDatabaseHeader = function () {
  return `Database named "${databaseName}" on Port#${databasePort}`;
};

// Testing a Get function
app.get("/test", (req, res) => {
  console.log("WHOO HOO!");
  res.send("GOT EM!");
});
