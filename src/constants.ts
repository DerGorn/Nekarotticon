import { body, createElement } from "./DOM.js";

enum Fancyness {
  fast,
  normal,
  extra,
}
type Fancy = keyof typeof Fancyness;

enum Ratings {
  experiment,
  adventure,
  good,
  divine,
}
type Rating = keyof typeof Ratings;
const RatingColorMap: { [key in Rating]: string } = {
  experiment: "red",
  adventure: "yellow",
  good: "green",
  divine: "purple",
};

enum Difficulties {
  einfach,
  mittel,
  schwer,
  iter,
}
type Difficulty = keyof typeof Difficulties;
type FancyfullMetaData = {
  title: string;
  rating: Rating;
  date: "TT.MM.JJJJ";
  fancyLevels: Fancy[];
  FancyfullTimeNeeded: { [keys in Fancy]: "0 min" };
  FancyfullDifficulty: { [keys in Fancy]?: Difficulty };
};
type Ingredient = {
  category: string;
  ingredient: string;
  amount: string;
  modifier: string;
};
type Step = {
  title: string;
  ingredients: Ingredient[];
  description: string;
};
type FancyfullRecipe = {
  image: string;
  MetaData: FancyfullMetaData;
  difficulty: { [keys in Fancy]?: Difficulties };
  FancyfullIngredients: { [keys in Fancy]?: Ingredient[] };
  FancyfullSteps: { [keys in Fancy]?: Step[] };
  FancyfullDescription: { [keys in Fancy]?: string };
};
type MetaData = {
  title: string;
  rating: Rating;
  date: "TT.MM.JJJJ";
  fancyLevels: Fancy[];
  timeNeeded: "0 min";
  difficulty: Difficulty;
};
type Recipe = {
  image: string;
  MetaData: MetaData;
  Ingredients: Ingredient[];
  Steps: Step[];
  description: string;
};

window.addEventListener("resize", function () {
  ScrollHeight();
});

function ScrollHeight() {
  var content = document.querySelectorAll(".parchment");
  var container = document.querySelectorAll(".contain");

  for (let i = 0; i < content.length; i++) {
    if (content[i] == null || container[i] == null) break;
    //@ts-ignore
    content[i].style.height = container[i].offsetHeight + "px";
  }
}

const buildBaseSite = () => {
  const site = createElement("div", {}, "site");
  const content = createElement("div", {}, "contain");
  const parchment = createElement("div", {}, "parchment");
  site.append(parchment, content);
  // const site = createElement("div", {}, "site");
  const logo = createElement("img", {}, "logo");
  logo.src = "images/logo.png";
  logo.addEventListener("click", () => (window.location.search = ""));
  site.append(logo);
  body.append(site);
  return content;
};

export {
  Fancyness,
  Fancy,
  FancyfullRecipe,
  Recipe,
  Difficulties,
  Ingredient,
  Step,
  Difficulty,
  MetaData,
  RatingColorMap,
  buildBaseSite,
  ScrollHeight,
};
