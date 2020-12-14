// Query Selector for all rows in table
let productTableRows = document.querySelectorAll("#product-entries tr");
let addButton = document.getElementById("add-btn");
let deleteProductButtons = document.getElementsByClassName(
  ".delete-product-btn"
);
let resetButton = document.getElementById("reset-db-btn");

// Create event listeners for every row
for (const product of productTableRows) {
  product.removeEventListener("click", clickableRow);
  product.addEventListener("click", clickableRow);
}

// Function to allow clickable row to detailed screen
function clickableRow() {
  const id = this.id;
  window.location.href = `/items/${id}`;
}

// TODO: Need to add listeners for button click to remove the row
for (const deleteBtn of deleteProductButtons) {
}

// Add new product
addButton.addEventListener("click", function () {
  window.location.href = "/items/new";
});

// Reset the db to seed file
resetButton.addEventListener("click", async function () {
  // TODO: Need to somehow import the seedData() module
  try {
    await fetch("/reset");
    window.location.href = "/";
    alert("Database reset to seed file!");
  } catch (err) {
    console.log(err);
  }
});
