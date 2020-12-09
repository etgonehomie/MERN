// Query Selector for all rows in table
let productTableRows = document.querySelectorAll("#product-entries tr");
let deleteProductButtons = document.querySelectorAll(
  "#product-entries .delete-product-btn"
);
let resetButton = document.querySelector("#reset-db-btn");
// Create event listeners for every row
for (const product of productTableRows) {
  product.removeEventListener("click", clickableRow);
  product.addEventListener("click", clickableRow);
}

// Function to allow clickable row to detailed screen
function clickableRow() {
  const id = this.id;
  window.location.href = `http://localhost:3000/items/${id}`;
}

// TODO: Need to add listeners for button click to remove the row
for (const deleteBtn of deleteProductButtons) {
}

// Reset the db to seed file
resetButton.addEventListener("click", function () {
  // TODO: Need to somehow import the seedData() module
  // seed.seedData();
  window.location.href = "http://localhost:3000";
});
