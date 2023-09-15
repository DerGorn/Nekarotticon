import { createElement } from "./DOM.js";
import EventBUS from "./EventBUS.js";
import { availableRecipes } from "./Router.js";
import {
  Difficulties,
  Fancy,
  MetaData,
  RatingColorMap,
  ScrollHeight,
  buildBaseSite,
} from "./constants.js";

const buildRecipeCard = (image: string, MetaData: MetaData, fancy: Fancy) => {
  const ratingColor = RatingColorMap[MetaData.rating];

  const header = createElement(
    "div",
    // { style: { backgroundImage: `url(images/${image})` } },
    {},
    "recipeHeader"
  );
  const titleHolder = createElement("div", {}, "titleHolder");
  const title = createElement(
    "div",
    { style: { textDecorationColor: ratingColor } },
    "text",
    "title"
  );
  title.innerText = MetaData.title;
  const date = createElement("div", {}, "text", "appendix");
  date.innerText = MetaData.date;
  titleHolder.append(title, date);

  const recipeImage = createElement(
    "img",
    { style: { borderColor: ratingColor } },
    "recipeImage"
  );
  recipeImage.src = `images/${image}`;
  recipeImage.addEventListener("load", ScrollHeight);

  const metaData = createElement("div", {}, "recipeMetaData");
  const time = createElement("div", { style: { fontWeight: "bold" } }, "text");
  time.innerText = "Zeit: ";
  const timeNeeded = createElement(
    "span",
    { style: { fontWeight: "normal" } },
    "text"
  );
  timeNeeded.innerText = MetaData.timeNeeded;
  time.append(timeNeeded);

  const difficulty = createElement(
    "div",
    { style: { fontWeight: "bold" } },
    "text",
    "difficultyHolder"
  );

  difficulty.innerText = "Schwierigkeit: ";
  const d = Number(Difficulties[MetaData.difficulty]);
  const difficultyIcons = createElement("div", {}, "difficultyHolder");
  for (let i = 0; i < Difficulties.iter; i++) {
    let filled = true;
    if (i > d) {
      filled = false;
    }
    const icon = createElement(
      "div",
      {},
      "difficultyIcon",
      filled ? "active" : "inactive"
    );
    const img = createElement("img", {}, "difficultyIconImage");
    img.src = "./images/silhouette.png";
    icon.append(img);
    difficultyIcons.append(icon);
  }
  const difficultyText = createElement(
    "span",
    { style: { fontWeight: "normal" } },
    "text",
    "iconSubText",
    "appendix"
  );
  difficultyText.innerText = MetaData.difficulty;
  const difficultyHolder = createElement("div", {}, "difficultyManager");
  difficultyHolder.append(difficultyIcons, difficultyText);
  difficulty.append(difficultyHolder);

  const fancyness = createElement(
    "div",
    { style: { fontWeight: "bold" } },
    "text"
  );
  const fancynessImage = createElement("img", {}, "fancyImage");
  fancynessImage.src = `images/Fancy/${fancy}.png`;
  fancyness.append(fancynessImage);
  metaData.append(time, difficulty, fancyness);
  header.append(titleHolder, recipeImage, metaData);
  return header;
};

const buildRecentView = (amount = 25) => {
  const recent = createElement("div", {});

  let start = availableRecipes.length - amount;
  EventBUS.registerEventListener(
    "buildRecipe",
    { name: "cardBuilder" },
    (e) => {
      e.card &&
        recent.append(
          buildRecipeCard(e.recipe.image, e.recipe.MetaData, e.fancy)
        );
    }
  );
  Promise.all(
    availableRecipes.slice(start > 0 ? start : 0).map(async (name) => {
      await EventBUS.fireEvent("loadRecipe", { name: name, card: true });
      console.log(name);
    })
  ).then(() => {
    console.log("end");
    EventBUS.removeEventListener("buildRecipe", "cardBuilder");
  });

  return recent;
};

const buildHome = () => {
  const site = buildBaseSite();

  const title = createElement("div", {}, "text", "title");
  title.innerText = "Nekarotticon";

  const recent = buildRecentView();

  site.append(title, recent);

  ScrollHeight();
};

const HomeBuilder = {
  start: () => {
    EventBUS.registerEventListener("buildHome", {}, buildHome);
  },
};

export default HomeBuilder;
