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
  category: String,
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
// Don't want to keep saving or else create duplicate items
// phone.save();

// This is a way to make multiple entries as well as saves it to the database
// Only do this once or else every time I run the app it will create this.
// Item.insertMany([
//   {
//     name: "Google Home",
//     category: "electronics",
//     quantity: 3,
//     price: 30,
//     shops: ["FB", "Craigslist"],
//   },
//   {
//     name: "Keyboard",
//     category: "electronics",
//     quantity: 1,
//     price: 100,
//     shops: ["FB"],
//   },
//   { name: "Dishes", category: "home", quantity: 1, price: 10, shops: ["Etsy"] },
//   {
//     name: "Earphones",
//     category: "electronics",
//     quantity: 2,
//     price: 30,
//     shops: ["Ebay", "Craigslist"],
//   },
//   {
//     name: "Books",
//     category: "books",
//     quantity: 40,
//     price: 20,
//     shops: ["Amazon", "Ebay"],
//   },
// ])
//   .then((data) => {
//     console.log("It worked");
//     console.log(`Data is ${data}`);
//   })
//   .catch((err) => {
//     console.log(`error of type: ${err}`);
//   });

// #4 Finding data. Need to use `.then` as the results are query object that is a promise-like object
// Can use find or findOne
Item.find({ category: "electronics" }).then((data) => {
  console.log("found data for:");
  console.log(data);
});

Item.find({ quantity: { $gt: 1 } }).then((data) => {
  console.log("foudnd data for more than 1 quantity:");
  console.log(data);
});

Item.findById("5fc2e7bdcad2c94fc7d5865e").then((data) => {
  console.log("found books item");
  console.log(data);
});

// #5 Updating data
// updateOne/Many -> returns the count of objects modified
// find*AndUpdate -> returns the object modified. With new = true option, it will return the modified object, else it will return the old non-modified object

// This will only give the count of items modified
Item.updateMany({ shops: { $in: ["FB", "Craigslist"] } }, { quantity: 5 }).then(
  (data) => {
    console.log(`updated items for FB/Craigslist`);
    console.log(data);
  }
);

// This will return the actual updated object if you set 'new' = true, else it will pass back the object as it was before the update.
Item.findByIdAndUpdate(
  "5fc2e7bdcad2c94fc7d5865e",
  { quantity: 50 },
  { new: true }
).then((data) => {
  console.log("updated books to 50 quantity");
  console.log(data);
});

// #6 Delete using Model functions
// deleteOne/Many -> returns the count of objects deleted
// find*AndDelete -> returns the object deleted
