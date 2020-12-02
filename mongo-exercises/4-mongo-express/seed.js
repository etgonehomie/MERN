// Used to seed the database when needing to debug

// Get mongoose started
const mongoose = require("mongoose");
const Product = require("./models/product.js");
const c = require("./constants");

mongoose
  .connect(`mongodb://localhost:${c.databasePort}/${c.databaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connection Success: ${c.displayDatabaseHeader()} open`);
  })
  .catch((e) => {
    console.log(`Connection Failure: ${c.displayDatabaseHeader()}`);
    console.log(
      `Ensure the mongo db is started using terminal alias cmd 'dbstart'`
    );
    console.log(`Error: ${e}`);
  });

// Clear out old data
// Product.remove()
//   .then(() => {
//     console.log("Successfully cleared db");
//   })
//   .catch((e) => {
//     console.log("Could not clear the db.");
//   });

// Seed new data
const seedFile = [
  {
    name: "iPhone X",
    price: 600,
    category: "Electronics",
    tag: ["phone"],
  },
  {
    name: "Securities & Analysis",
    price: 40.99,
    category: "Books",
    tag: ["investing", "finance"],
  },
  {
    name: "Eat that Frog",
    price: 5,
    category: "Books",
    tag: ["self-help"],
  },
  {
    name: "Plates",
    price: 10,
    category: "Home Goods",
    tag: ["dishware"],
  },
  {
    name: "Wireless Earphones",
    price: 15,
    category: "Electronics",
    tag: ["phone", "accessories"],
  },
];

// TODO: Need to see why I can't see this in Mongo shell
Product.insertMany(seedFile)
  .then((res) => {
    console.log("Data seeded!");
    console.log(res);
  })
  .catch((e) => {
    console.log("Error: Issue with seeding data");
    console.log(e);
  });

Product.find({});
