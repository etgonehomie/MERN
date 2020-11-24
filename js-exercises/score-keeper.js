const winScoreSelector = document.querySelector("#playto");
const resetButton = document.querySelector("#reset");

const playerOne = {
  score: 0,
  display: document.querySelector("#p1Display"),
  button: document.querySelector("#p1Button"),
  didWin: false,
};

const playerTwo = {
  score: 0,
  display: document.querySelector("#p2Display"),
  button: document.querySelector("#p2Button"),
  didWin: false,
};

const players = [playerOne, playerTwo];

let winScore = winScoreSelector.value;

// EVENT LISTENERS
winScoreSelector.addEventListener("change", (event) => {
  winScore = event.target.value;
});

players.forEach((player) => {
  player.button.addEventListener("click", playerScored);
});

resetButton.addEventListener("click", resetGame);

// Updates the relevant player score and checks to see if game ended or not
function playerScored() {
  const player = getPlayer(this.id);
  player.score += 1;
  player.display.innerHTML = player.score;
  if (player.score >= winScore) {
    player.didWin = true;
    stopGame();
  }
}

function stopGame() {
  for (player of players) {
    console.log(player);
    player.button.setAttribute("disabled", true);
    if (player.didWin == true) {
      player.display.classList.add("win-display");
    } else {
      player.display.classList.add("lose-display");
    }
  }
}

function resetGame() {
  for (player of players) {
    player.didWin = false;
    player.score = 0;
    player.display.innerHTML = player.score;
    player.display.classList.add("reset-display");
    player.display.classList.remove("win-display", "lose-display");
    player.button.removeAttribute("disabled");
  }
}

function getPlayer(id) {
  for (player of players) {
    if (player.button.id == id) {
      return player;
    }
  }
}

function setButtonsDisabled(isDisabled) {
  players.forEach((player) => {
    if (isDisabled) {
      player.button.setAttribute("disabled", true);
    }
  });
}
