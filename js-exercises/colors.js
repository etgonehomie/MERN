const btn = document.querySelector("BUTTON");
btn.addEventListener("click", generateRGB);

function randomNumber(min = 0, max = 255) {
  return Math.round(Math.random() * (max - min) + min);
}

function generateRGB() {
  const red = randomNumber();
  const green = randomNumber();
  const blue = randomNumber();
  const rgbColor = `rgb(${red},${green},${blue})`;
  document.querySelector("H2").innerHTML = rgbColor;
  document.body.style.backgroundColor = rgbColor;
}
