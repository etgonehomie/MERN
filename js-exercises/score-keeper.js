// const playerOne
const playerOneDisplay = document.querySelector("#p1Display");
const playerTwoDisplay = document.querySelector("#p2Display");
const winScoreSelector = document.querySelector("#playto");
const playerOneButton = document.querySelector("#p1Button");
const playerTwoButton = document.querySelector("#p2Button");
const resetButton = document.querySelector("#reset");

const playerButtons = [playerOneButton, playerTwoButton];
const playerDisplays = [playerOneDisplay, playerTwoDisplay];

// craete event listeners for each button
// 1. if p1/p2 pressed update display
// 2. if p1 or p2 display reaches winScore
//     > grey out buttons and set color of displays to green/red as needed
// 3. if reset button is pressed
//     > un-grey out buttons
//     > reset displays
//     > reset colors

let playerOneScore = 0;
let playerTwoScore = 0;
let winScore = winScoreSelector.value;
console.log(`winscore is ${winScore}`);
winScoreSelector.addEventListener("change", (event) => {
  winScore = event.target.value;
});

playerButtons.forEach((button) => {
  button.addEventListener("click", playerScored);
});

resetButton.addEventListener("click", resetGame);

function playerScored() {
  if (this.id == "p1Button") {
    playerOneScore += 1;
    playerOneDisplay.innerHTML = playerOneScore;
    if (playerOneScore >= winScore) {
      playerOneDisplay.classList.add("win-display");
      playerTwoDisplay.classList.add("lose-display");
      setButtonsDisabled(true);
    }
  } else {
    playerTwoScore += 1;
    playerTwoDisplay.innerHTML = playerTwoScore;
    if (playerTwoScore >= winScore) {
      playerTwoDisplay.classList.add("win-display");
      playerOneDisplay.classList.add("lose-display");
      setButtonsDisabled(true);
    }
  }
}

function setButtonsDisabled(isDisabled) {
  playerButtons.forEach((button) => {
    console.dir(button);
    if (isDisabled) {
      button.setAttribute("disabled", isDisabled);
    } else {
      button.removeAttribute("disabled");
    }
  });
}

function resetGame() {
  setButtonsDisabled(false);
  playerOneScore = 0;
  playerTwoScore = 0;

  playerDisplays.forEach((display) => {
    display.innerHTML = "0";
    display.classList.add("reset-display");
    display.classList.remove("win-display", "lose-display");
  });
}
