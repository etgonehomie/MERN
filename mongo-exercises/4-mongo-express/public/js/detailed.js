const deleteButton = document.getElementById("delete-product");
const editAndSaveButton = document.getElementById("edit-save-product");
const editModeClassName = "edit-detailed";
const displayModeClassName = "display-detailed";
const inputIds = ["price", "tags", "category"];
// TODO: Need to somehow get the ID to pass to the edit/delete functions

deleteButton.addEventListener("click", function () {
  const id = this.parentElement.id;
  //TODO: Need to delete send a fetch(url, delete) call
  window.location.href = `http://localhost:3000`;
});

//TODO: Make a listener for on page load that:
// Sets the fields to display or edit
// Also sets the tags
// Also sets the selected category

editAndSaveButton.addEventListener("click", async function () {
  // If in edit mode and click on save, try to save to the database and then go to display mode
  if (this.classList.contains(editModeClassName)) {
    const id = this.parentElement.id;
    // Update the database:
    const response = await fetch(`/items/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      redirect: "follow",
      body: JSON.stringify({
        price: document.getElementById("price").value,
        category: document.getElementById("category").value,
        tag: document.getElementById("tags").value,
      }),
    })
      .then(() => {
        console.log("Successfuly brought back");
        setDisplayMode(this);
      })
      .catch((error) => {
        alert("received error");
        console.log(error);
      });
  } else {
    setEditMode(this);
  }
});

// Helper function to setup the detailed screen for display mode
function setDisplayMode(button) {
  button.classList.remove(editModeClassName);
  button.classList.add(displayModeClassName);
  button.innerText = "Edit Product";
  setInputToDisplay(true);
}

// Helper function to setup the detailed screen for edit mode
function setEditMode(button) {
  button.classList.remove(displayModeClassName);
  button.classList.add(editModeClassName);
  button.innerText = "Save Product";
  setInputToDisplay(false);
}

// Helper Function to set the inputs to display or edit mode
function setInputToDisplay(isDisplayMode) {
  for (const id of inputIds) {
    if (isDisplayMode) {
      document.getElementById(id).setAttribute("disabled", true);
    } else {
      document.getElementById(id).removeAttribute("disabled");
    }
  }
}
