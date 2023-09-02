const fs = require("fs");
const path = require("path");

const specialFiles = ["templateRecipe.txt"];
const recipePath = path.join(__dirname, "../recipePrototypes");

const files = fs
  .readdirSync(recipePath)
  .filter((f) => !specialFiles.includes(f));

files.forEach((f) => {
  const file = `${recipePath}/${f}`;
  const date = fs.statSync(file).mtime;
  console.log(date);
});
console.log(files);
