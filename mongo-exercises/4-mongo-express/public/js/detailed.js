const deleteButton = document.getElementById("delete-product");
const editAndSaveButton = document.getElementById("edit-save-product");
const categoryLabel = document.getElementById("category");
const tagsLabel = document.getElementById("tags");
const editModeClassName = "edit-detailed";
const displayModeClassName = "display-detailed";
const inputIds = ["price", "tags", "category"];

deleteButton.addEventListener("click", function () {
  const id = document.body.id;
  //TODO: Need to delete send a fetch(url, delete) call
  window.location.href = `http://localhost:3000`;
});

document.addEventListener("DOMContentLoaded", async function () {
  const id = document.body.id;
  let product;
  try {
    const res = await fetch(`/items-data/${id}`);
    const data = await res.json();
    product = data.product;

    const reducer = (accumulator, currentValue) => {
      accumulator + ", " + currentValue.trim();
    };

    // Set the category and tags
    document.getElementById(product.category).setAttribute("selected", true);
    const tags = product.tag.reduce(reducer);
    tagsLabel.value = tags;

    //TODO: Need to check if edit or display mode
  } catch (err) {
    console.log("error occurred");
    console.log(err);
  }

  console.log(product);
});

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
        setDisplayMode();
      })
      .catch((error) => {
        alert("received error");
        console.log(error);
      });
  } else {
    setEditMode();
  }
});

// Helper function to setup the detailed screen for display mode
function setDisplayMode() {
  editAndSaveButton.classList.remove(editModeClassName);
  editAndSaveButton.classList.add(displayModeClassName);
  editAndSaveButton.innerText = "Edit Product";
  setInputToDisplay(true);
}

// Helper function to setup the detailed screen for edit mode
function setEditMode() {
  editAndSaveButton.classList.remove(displayModeClassName);
  editAndSaveButton.classList.add(editModeClassName);
  editAndSaveButton.innerText = "Save Product";
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
