// Used to seed the database when needing to debug
const mongoose = require("mongoose");
const Product = require("./models/ProductModel.js");

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

module.exports = { seedData };
