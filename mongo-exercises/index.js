// #1 Boilerplate for MongoDB with Mongoose package to help with interacting with data
const { ObjectID } = require("bson");
const mongoose = require("mongoose");
const databaseName = "inventory";
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

// #2 Create the structure for your data
const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  shops: [String],
  pictures: [String],
});

// #3 Actually create the datamodel. The name of the model should be Singular and Uppercase
// Monoose creates a colleciton with the name by lowercasing and plurarizing the name.
// In this example the collection would be `items`
const Item = mongoose.model("Item", itemSchema);

// #4 Create new entries in the db collection by doing...
// A) create an new instance of the model
const phone = new Item({
  name: "iPhone 8",
  quantity: 1,
  price: 400,
  shops: ["FB"],
});

// B) save that instance into the actual collection in the db
phone.save();

// This is a way to make multiple entries as well as saves it to the database
// Only do this once or else every time I run the app it will create this.
// Item.insertMany([
//   { name: "Google Home", quantity: 3, price: 30, shops: ["FB", "Craigslist"] },
//   { name: "Keyboard", quantity: 1, price: 100, shops: ["FB"] },
//   { name: "Dishes", quantity: 1, price: 10, shops: ["Etsy"] },
//   { name: "Earphones", quantity: 2, price: 30, shops: ["Ebay", "Craigslist"] },
//   { name: "Books", quantity: 40, price: 20, shops: ["Amazon", "Ebay"] },
// ])
//   .then((data) => {
//     console.log("It worked");
//     console.log(`Data is ${data}`);
//   })
//   .catch((err) => {
//     console.log(`error of type: ${err}`);
//   });
