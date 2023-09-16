const fs = require("fs");
const path = require("path");

const specialFiles = ["templateRecipe.txt"];
const protoRecipePath = path.join(__dirname, "../recipePrototypes");
const recipePath = path.join(__dirname, "../recipes");

const files = fs
  .readdirSync(protoRecipePath)
  .filter((f) => !specialFiles.includes(f))
  .sort((f, g) => {
    return (
      fs.statSync(`${protoRecipePath}/${f}`).mtimeMs -
      fs.statSync(`${protoRecipePath}/${g}`).mtimeMs
    );
  });

files.forEach((f) => {
  const file = `${protoRecipePath}/${f}`;
  const content = fs.readFileSync(file, { encoding: "utf-8" });

  const recipe = {
    image: "",
    MetaData: {
      fancyLevels: [],
      FancyfullTimeNeeded: {},
      FancyfullDifficulty: {},
    },
    FancyfullIngredients: {},
    FancyfullSteps: {},
    FancyfullDescription: {},
  };
  let curDepth = 0;
  let curPhase = "";
  let curFancyLevel = "";
  let curStep = null;
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trimEnd();
    switch (i) {
      case 0:
        recipe.MetaData.title = line;
        break;
      case 1:
        recipe.MetaData.date = line;
        break;
      case 2:
        recipe.image = line;
        break;
      case 3:
        recipe.MetaData.rating = line;
        break;
      default:
        const leadingSpace = line.match(" +");
        if (leadingSpace === null && line !== "") {
          curDepth = 0;
          curPhase = "time";
          curFancyLevel = line.slice(0, -1);
          // console.log("new Fancy Level: ", curFancyLevel);
          recipe.MetaData.fancyLevels.push(curFancyLevel);
          recipe.MetaData.FancyfullTimeNeeded[curFancyLevel] = "";
          recipe.MetaData.FancyfullDifficulty[curFancyLevel] = "";
          recipe.FancyfullIngredients[curFancyLevel] = [];
          recipe.FancyfullSteps[curFancyLevel] = [];
          recipe.FancyfullDescription[curFancyLevel] = "";
        } else if (line === "") {
          if (curPhase === "ingredients") {
            curPhase = "description";
          } else if (curPhase === "description") {
            if (curStep === null) {
              recipe.FancyfullDescription[curFancyLevel] += "\n";
            } else {
              curStep.description += "\n";
            }
          }
        } else {
          const numberOfSpace = leadingSpace[0].length;
          line = line.trimStart();
          switch (curPhase) {
            case "time":
              recipe.MetaData.FancyfullTimeNeeded[curFancyLevel] += line;
              curPhase = "difficulty";
              break;
            case "difficulty":
              recipe.MetaData.FancyfullDifficulty[curFancyLevel] += line;
              curPhase = "title";
              break;
            case "title":
              curDepth = numberOfSpace;
              if (line.at(-1) !== ":") {
                if (curStep !== null)
                  recipe.FancyfullSteps[curFancyLevel].push(curStep);
                curStep = null;
                curPhase = "description";
                i--;
                continue;
              }
              line = line.slice(0, -1);
              if (line === "Zutaten") {
                curPhase = "ingredients";
              } else {
                if (curStep !== null)
                  recipe.FancyfullSteps[curFancyLevel].push(curStep);
                curStep = { title: line, ingredients: [], description: "" };
                // console.log("new Step: ", line);
                curPhase = "ingredients";
              }
              break;
            case "ingredients":
              if (numberOfSpace === curDepth) {
                curPhase = "title";
                i--;
                continue;
              }
              const entries = line.split("* ");
              const ingredient = {
                amount: entries[0] ? entries[0].trimEnd() : "",
                ingredient: entries[1] ? entries[1].trimEnd() : "",
                modifier: entries[2] ? entries[2].trimEnd() : "",
                category: entries[3] ? entries[3].trimEnd() : "",
              };
              if (curStep === null) {
                recipe.FancyfullIngredients[curFancyLevel].push(ingredient);
              } else {
                curStep.ingredients.push(ingredient);
              }
              break;
            case "description":
              if (curStep === null) {
                recipe.FancyfullDescription[curFancyLevel] += line;
                continue;
              }
              if (numberOfSpace === curDepth) {
                curPhase = "title";
                i--;
                continue;
              }
              curStep.description += line;
              break;
          }
        }
    }
  }
  fs.writeFileSync(
    `${recipePath}/${f.replace(".txt", ".json")}`,
    JSON.stringify(recipe)
  );
  // console.dir(recipe, { depth: null });
});
