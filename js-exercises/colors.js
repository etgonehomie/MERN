const btn = document.querySelector("BUTTON");
btn.addEventListener("click", generateRGB);

function randomNumber(max, min = 0) {
  return Math.round(Math.random() * (max - min) + min);
}

function generateRGB() {
  const red = randomNumber(255);
  const green = randomNumber(255);
  const blue = randomNumber(255);
  const rgbColor = `rgb(${red},${green},${blue})`;
  document.querySelector("H2").innerHTML = rgbColor;
  document.body.style.backgroundColor = rgbColor;
}
