const baseURL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const p = document.querySelector("p");
const numberOfPokemon = 2000;
for (let pokemon = 1; pokemon <= numberOfPokemon; pokemon++) {
  const url = `${baseURL}${pokemon}.png`;
  const img = document.createElement("img");
  img.src = url;
  p.append(img);
}
