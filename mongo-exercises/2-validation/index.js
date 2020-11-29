// #1 Boilerplate for MongoDB with Mongoose package to help with interacting with data
const { ObjectID } = require("bson");
const mongoose = require("mongoose");
const databaseName = "validation";
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
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: [10, "upgrade to increase title length"],
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 99999,
  },
  categories: {
    type: [String],
    default: ["uncategorized"],
  },
  shops: [String],
  pictures: [String],
});
const Product = mongoose.model("Product", productSchema);

// #3 Create a new record with correct validation and save it
const phone = new Product({
  name: "iPhone 8",
  quantity: 1,
  price: 400,
  shops: ["FB"],
});
phone.save();

// #4 Create a new record with incorrect validation and save it
const bottle = new Product({
  name: "Hydroflask",
  price: 400,
  shops: ["FB"],
});

bottle
  .save()
  .then((data) => {
    console.log("it worked");
    console.log(data);
  })
  .catch((error) => {
    console.log("you got an error");
    console.log(`Error Message: ${error._message}`);
  });

// #5 Create a new record with incorrect validation with default error msg from the create validation
const laptop = new Product({
  name:
    "BRAND NEW - Great Find HP Envy - 16GB - 512GB SSD - LoL Capable - Run all your code!!!",
  price: 900,
  quantity: 1,
  shops: ["FB"],
});

laptop
  .save()
  .then((data) => {
    console.log("it worked");
    console.log(data);
  })
  .catch((error) => {
    console.log("you got an error");
    console.log(`Error Message: ${error._message}`);
    console.log(error.errors.name.properties.message);
  });

// #6 In order to use the create validations on updates you need to set the options

// Allows a faulty name because run validators is not set
Product.findOneAndUpdate(
  { name: "iPhone 8" },
  { name: "iPhone X BRAND NEW BUY NOW" },
  { new: true }
)
  .then((data) => {
    console.log("allowed faulty name because validators not set");
    console.log(data);
  })
  .catch((err) => {
    console.log(`Error is: ${err._message}`);
  });

// Does not allow faulty name because run validators IS set
Product.findOneAndUpdate(
  { name: "iPhone 8" },
  { name: "iPhone X BRAND NEW BUY NOW" },
  { new: true, runValidators: true }
)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(`Error is: ${err._message}`);
  });
