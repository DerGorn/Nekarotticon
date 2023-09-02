const fs = require("fs");
const path = require("path");

const specialFiles = [
  "availableRecipes.json",
  "templateRecipe.json",
  "allHeaders.json",
];
const recipePath = path.join(__dirname, "../recipes");

const writeAvailableRecipes = () => {
  const availableRecipes = [];

  const files = fs.readdirSync(recipePath);
  files.forEach(function (file) {
    if (specialFiles.includes(file)) return;
    availableRecipes.push(file.slice(0, -5));
  });

  fs.writeFile(
    `${recipePath}/availableRecipes.json`,
    `{\"available\":[\"${availableRecipes.join('", "')}\"]}`,
    (err) => {
      return err
        ? console.error("There was a error writing availableRecipes", err)
        : null;
    }
  );

  return availableRecipes;
};

const writeAllHeaders = (availableRecipes) => {
  const allHeader = {};

  availableRecipes.forEach((recipeName) => {
    const file = `${recipePath}/${recipeName}.json`;
    const recipe = JSON.parse(fs.readFileSync(file));
    const header = recipe.MetaData;
    allHeader[recipeName] = header;
  });

  fs.writeFile(
    `${recipePath}/allHeaders.json`,
    JSON.stringify(allHeader),
    (err) => {
      return err
        ? console.error("There was a error writing allHeaders", err)
        : null;
    }
  );
};

const availableRecipes = writeAvailableRecipes();
writeAllHeaders(availableRecipes);
