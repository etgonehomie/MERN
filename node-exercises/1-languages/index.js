// NPM Imports
const langs = require("langs");
const franc = require("franc");
const colors = require("colors");

function determineLanguage(inputString) {
  const languageCode = franc(inputString);
  console.log(`language code is ${languageCode}`);
  if (languageCode === "und") {
    return "Need more input to determine langugage".red;
  }
  const language = langs.where("3", languageCode);

  if (language === "undefined") {
    return "Need more input to determine langugage".red;
  }
  return language.name.green;
}

const myStrings = [
  "Hello. My name is Eric Tom. How are you doing today? The weather is great today!",
  "asdfasffsafssdf",
];

for (str of myStrings) {
  console.log(`${determineLanguage(str)}: ${str}`);
}
