// #1 Boilerplate for MongoDB with Mongoose package to help with interacting with data
const { ObjectID } = require("bson");
const mongoose = require("mongoose");
const databaseName = "person";
const databasePort = "27017";
mongoose
  .connect(`mongodb://localhost:${databasePort}/${databaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection open");
  })
  .catch((e) => {
    console.log(`Connection failed with error: ${e}`);
  });

// #2 Create the structure for your data with validation and then create a model
// VALIDATIONS ONLY work on CREATE
const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

// This is used to derive using data in the database

personSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`;
});

// Can implement this to seperate on the space and then set the first and last names
personSchema.virtual("fullName").set(function () {
  return `${this.first} ${this.last}`;
});

/**
 * https://mongoosejs.com/docs/middleware.html
 * #3 Define middleware, which are functions that mongoose calls right before or right after a mongoose function is called
 * Helps to process all requests that pass from client -> server
 * Middleware is synonymous with hooks
 */

let inputtedFirst = "";
let inputtedLast = "";
// Pre function that is called before every and any save
personSchema.pre("save", async function () {
  inputtedFirst = this.first;
  inputtedLast = this.last;
  this.first = "Eric";
  this.last = "Tom";
  console.log(`This is processed BEFORE any save`);
  console.log(`PRE changes it to ${this.fullName}`);
});

personSchema.post("save", async function () {
  this.first = inputtedFirst;
  this.last = inputtedLast;
  console.log("This is called AFTER any save");
  console.log(
    `Revert back to original name of ${this.fullName}, and this is saved to the DB`
  );
});

const Person = mongoose.model("Person", personSchema);
