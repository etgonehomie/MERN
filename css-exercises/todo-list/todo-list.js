let validInput = ["a", "d", "l", "q"];
let items = [];
let numberOfItems = 0;
let userInput = "";
do {
  userInput = prompt("What do you want to do?");
  if (userInput === null) {
    userInput = "q";
  }
  let userInputLowerCase = userInput.toLowerCase();

  if (validInput.includes(userInputLowerCase)) {
    numberOfItems = items.length;
    switch (userInputLowerCase) {
      case "q":
        console.log("Yes, I'm done!");
        break;
      case "a":
        let item = prompt("What item to add?");
        items.push(item);
        showList();
        break;
      case "d":
        let indexToDelete = -1;
        if (numberOfItems > 0) {
          do {
            indexToDelete = parseInt(prompt("What index to delete?"));
          } while (
            isNaN(indexToDelete) ||
            indexToDelete < 0 ||
            indexToDelete >= numberOfItems
          );
          console.log(`Deleting this index: ${indexToDelete}`);
          console.log(`Item ${items[indexToDelete]} deleted`);
          items.splice(indexToDelete, 1);
        } else {
          console.log("No items to delete");
        }
        break;
      case "l":
        showList();
        break;
    }
  }
} while (userInput.toLowerCase() !== "q" && userInput.toLowerCase() !== "quit");

function showList() {
  console.log("*******TO-DO LIST******");
  console.log("***********************");
  numberOfItems = items.length;
  if (numberOfItems > 0) {
    for (let index = 0; index < numberOfItems; index++) {
      console.log(`${index}: ${items[index]}`);
    }
  } else {
    console.log("Empty To-do List");
  }
  console.log("***********************");
}
