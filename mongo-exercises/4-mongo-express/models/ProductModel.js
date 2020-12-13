const mongoose = require("mongoose");

const validCategories = [
  "Electronics",
  "Creative",
  "Home Goods",
  "Decorations",
  "Books",
];

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 40,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    default: "Uncategorized",
    enum: validCategories,
  },
  tags: [String],
});

// Pre function that is called before every and any save
productSchema.pre("save", async function () {
  if (this.name > 40 || !this) {
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
