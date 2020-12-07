const deleteButton = document.querySelector("#delete-product");
const editButton = document.querySelector("#edit-product");

// TODO: Need to somehow get the ID to pass to the edit/delete functions

deleteButton.addEventListener("click", function () {
  //TODO: Need to delete send a fetch(url, delete) call
  const pathName = window.location.pathname;
  console.log(`pathname = ${pathName}`);
  window.location.href = `http://localhost:3000`;
});

editButton.addEventListener("click", function () {
  window.location.href("");
  //   window.location.href = `http://localhost:3000/${id}/edit`;
});
