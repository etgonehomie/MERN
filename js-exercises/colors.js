const btn = document.querySelector("BUTTON");
btn.addEventListener("click", generateRGB);

function generateRGB() {
  const red = randomNumber(155);
  const green = randomNumber(155);
  const blue = randomNumber(155);
  const rgbColor = `RGB(${red}, ${green}, ${blue})`;
  document.body.style.backgroundColor = rgbColor;
  const darkColorThreshold = 50;
  const colors = [red, green, blue];
  let isColorDark = true;
  for (color of colors) {
    if (color > darkColorThreshold) {
      isColorDark = false;
    }
  }
  updateText(rgbColor, isColorDark);
}

function updateText(color, isColorDark) {
  const h2 = document.querySelector("H2");
  const h1 = document.querySelector("H1");
  h2.innerHTML = color;
  if (isColorDark) {
    h1.style.color = "white";
    h2.style.color = "white";
  } else {
    h1.style.color = "black";
    h2.style.color = "black";
  }

  i;
}

function randomNumber(max, min = 0) {
  return Math.round(Math.random() * (max - min) + min);
}
