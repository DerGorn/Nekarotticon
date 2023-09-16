import { createElement } from "./DOM.js";
import EventBUS from "./EventBUS.js";
import { availableRecipes } from "./Router.js";
import {
  Difficulties,
  Fancy,
  Fancyness,
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
    "recipeHeader",
    "recipeCard"
  );
  const titleHolder = createElement("div", {}, "titleHolder");
  const title = createElement(
    "div",
    { style: { textDecorationColor: ratingColor } },
    "text",
    "title"
  );
  title.innerText = MetaData.title;
  titleHolder.append(title);

  const recipeImage = createElement(
    "img",
    { style: { borderColor: ratingColor } },
    "recipeImage"
  );
  recipeImage.src = `images/${image}`;
  recipeImage.addEventListener("load", ScrollHeight);
  // recipeImage.addEventListener("load", () => {
  //   header.style.height = `${recipeImage.scrollHeight}px`;
  //   header.style.width = `${recipeImage.scrollWidth}px`;
  // });

  const metaData = createElement("div", {}, "recipeMetaData");

  const difficulty = createElement(
    "div",
    { style: { fontWeight: "bold" } },
    "text",
    "difficultyHolder"
  );
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
  difficulty.append(difficultyIcons);

  const fancyness = createElement(
    "div",
    { style: { fontWeight: "bold" } },
    "text"
  );
  const fancynessImage = createElement("img", {}, "fancyImage");
  fancynessImage.src = `images/Fancy/${fancy}.png`;
  fancyness.append(fancynessImage);
  metaData.append(difficulty, fancyness);
  header.append(titleHolder, recipeImage, metaData);
  return header;
};

const buildRecentView = (amount = 25) => {
  const recent = createElement("div", {}, "recentView");

  let start = availableRecipes.length - amount;
  const recipeSlice = availableRecipes.slice(start > 0 ? start : 0);
  // const cards: { [key: string]: HTMLDivElement } = {};
  const cards = Array(recipeSlice.length);
  EventBUS.registerEventListener(
    "buildRecipe",
    { name: "cardBuilder" },
    (e) => {
      if (!e.card) return;
      const card = buildRecipeCard(e.recipe.image, e.recipe.MetaData, e.fancy);
      card.addEventListener(
        "click",
        () =>
          (window.location.search = `name=${e.name}&fancyness=${Number(
            Fancyness[e.fancy]
          )}`)
      );
      cards[availableRecipes.length - 1 - availableRecipes.indexOf(e.name)] =
        card;
    }
  );
  Promise.all(
    recipeSlice.map(async (name) => {
      await EventBUS.fireEvent("loadRecipe", { name: name, card: true });
    })
  ).then(() => {
    recent.append(...cards);
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
