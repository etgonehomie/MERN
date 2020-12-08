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

// Make a listener for on page load that either sets the fields to display or edit

editAndSaveButton.addEventListener("click", function () {
  console.log(`this BEFORE class is ${this.classList}`);

  if (this.classList.contains(editModeClassName)) {
    setDisplayMode(this);
  } else {
    setEditMode(this);
    // TODO: Need to PATCH this request
  }
  console.log(`this AFTER class is ${this.classList}`);
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
