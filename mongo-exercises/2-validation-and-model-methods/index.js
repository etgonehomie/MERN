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
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: [String],
    default: ["uncategorized"],
  },
  shops: [String],
  pictures: [String],
});

// #7 Add instance methods (methods available at the instance level)
// NOTE: MAKE SURE for instance methods TO USE FUNCTION () and not ==> functions.
// The `this` value changes if use the arrow function for instance methods
// NOTE2: Need to add these methods before actually creating the model using the 'const Product = ...'
productSchema.methods.displayItem = function () {
  console.log(
    `You have ${this.quantity} ${this.name} each priced at $${this.price}!`
  );
};

// Another instance method to easily modify the data in that particular instance of the model
productSchema.methods.toggleSale = function () {
  this.onSale = !this.onSale;
  this.save();
};

// #8 Static method - used against the model itself and not just an instance of the model
productSchema.statics.fireSale = function () {
  return this.updateMany({}, { onSale: true, price: 20 });
};

// ********************************************************************************************************
// TAKEAWAY POINT INSTANCE METHODS: You want to create INSTANCE methods that modify an particular instance of your model
// so that I dont have to keep re-writing logic
//
// TAKEAWAY POINT STATIC METHODS: Basically doing some kind of fancy CRUD operation to all the instances of the model.
// You want to create STATIC methods where you do a certain group of logic against all the instances of the class.
// ********************************************************************************************************

// Create the model only after creating the methods for that model
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

// Call the instance mehtod
phone.displayItem();

// Call the static method
Product.fireSale().then((data) => {
  console.log("Performed a fire sale");
  console.log(data);
});
