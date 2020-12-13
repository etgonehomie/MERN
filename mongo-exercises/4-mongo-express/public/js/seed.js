// Used to seed the database when needing to debug

// Get mongoose started
const mongoose = require("mongoose");
const Product = require("../../models/ProductModel.js");
const c = require("../../constants");
const databaseConnection = `mongodb://localhost:${c.databasePort}/${c.databaseName}`;
console.log(databaseConnection);

mongoose
  .connect(databaseConnection, {
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

// Seed new data
const seedFile = [
  {
    name: "iPhone X",
    price: 600,
    category: "Electronics",
    tags: ["phone", "apple", "smartphone"],
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

// Clear out old data
async function seedData() {
  const clearData = await Product.remove();
  return await Product.insertMany(seedFile);
}

// Clear out the data and add new data in
seedData()
  .then((data) => {
    console.log("Data removed and seeded");
    console.log(data);
  })
  .catch((error) => {
    console.log("Error: Not able to remove and insert the new data");
    console.log(error);
  });

module.exports = { seedData };
