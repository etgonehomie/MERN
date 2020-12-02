const { Schema } = require("mongoose");

const validCategories = [
    'Electronics',
    'Creative',
    'Home Goods',
    'Decorations',
    'Books'
]

const productSchema = new Schema({
  name: {
      type: String,
      required: true,
      maxlength: 20
  },
  price: {
      type: Number,
      required: true,
      min: 0
  },
  category: {
      type: String,
      default: "Uncategorized",
      enum: validCategories 
  }
  tag: [String]
})

const Product = mongoose.model("Product", productSchema);
