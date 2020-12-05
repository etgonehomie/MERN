const Product = require("../../models/ProductModel");

// Query Selector for all rows in table
let productTableRows = document.querySelectorAll("#product-entries tr");

// Create event listeners for every row
for (const product of productTableRows) {
  // product.removeEventListener("click", clickHandler, false);

  product.addEventListener("click", function () {
    // TODO: Destroy all existing event listeners

    // On click of the row navigate to a new detials screen
    const id = product.id;
    Product.findById(id);
    // TODO: Navigate to: "http://localhost:3000/items/new" method="GET">
  });
}
