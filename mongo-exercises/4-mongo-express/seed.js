// Used to seed the database when needing to debug

// Get mongoose started
const mongoose = require("mongoose");
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

const Product = require("./models/ProductModel.js");
// Clear out old data
Product.remove()
  .then(() => {
    console.log("Successfully cleared db");
  })
  .catch((e) => {
    console.log("Could not clear the db.");
  });

// Seed new data
const seedFile = [
  {
    name: "iPhone X",
    price: 600,
    category: "Electronics",
    tags: ["phone"],
  },
  {
    name: "Securities & Analysis",
    price: 40.99,
    category: "Books",
    tags: ["investing", "finance"],
  },
  {
    name: "Eat that Frog",
    price: 5,
    category: "Books",
    tags: ["self-help"],
  },
  {
    name: "Plates",
    price: 10,
    category: "Home Goods",
    tags: ["dishware"],
  },
  {
    name: "Wireless Earphones",
    price: 15,
    category: "Electronics",
    tags: ["phone", "accessories"],
  },
];

Product.insertMany(seedFile)
  .then((res) => {
    console.log("Data seeded!");
    console.log(res);
  })
  .catch((e) => {
    console.log("Error: Issue with seeding data");
    console.log(e);
  });
