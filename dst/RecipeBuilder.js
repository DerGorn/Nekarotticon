import { body, createElement } from "./DOM.js";
import EventBUS from "./EventBUS.js";
import { Difficulties, } from "./constants.js";
const buildBaseSite = () => {
    const site = createElement("div", {}, "site");
    const logo = createElement("img", {}, "logo");
    logo.src = "images/logo.png";
    logo.addEventListener("click", () => alert("Home"));
    site.append(logo);
    return site;
};
const buildHeader = (image, MetaData, fancy) => {
    const header = createElement("div", { style: { backgroundImage: `url(images/${image})` } }, "recipeHeader");
    const titleHolder = createElement("div", {}, "titleHolder");
    const title = createElement("div", {}, "text", "title");
    title.innerText = MetaData.title;
    const date = createElement("div", {}, "text", "appendix");
    date.innerText = MetaData.date;
    titleHolder.append(title, date);
    const metaData = createElement("div", {}, "recipeMetaData");
    const time = createElement("div", { style: { fontWeight: "bold" } }, "text");
    time.innerText = "Zeit: ";
    const timeNeeded = createElement("span", { style: { fontWeight: "normal" } }, "text");
    timeNeeded.innerText = MetaData.timeNeeded;
    time.append(timeNeeded);
    const difficulty = createElement("div", { style: { fontWeight: "bold" } }, "text", "difficultyHolder");
    difficulty.innerText = "Schwierigkeit: ";
    const d = Number(Difficulties[MetaData.difficulty]);
    const difficultyIcons = createElement("div", {}, "difficultyHolder");
    for (let i = 0; i < Difficulties.iter; i++) {
        let filled = true;
        if (i > d) {
            filled = false;
        }
        const icon = createElement("div", {}, "difficultyIcon", filled ? "active" : "inactive");
        const img = createElement("img", {}, "difficultyIconImage");
        img.src = "./images/silhouette.png";
        icon.append(img);
        difficultyIcons.append(icon);
    }
    const difficultyText = createElement("span", { style: { fontWeight: "normal" } }, "text", "iconSubText", "appendix");
    difficultyText.innerText = MetaData.difficulty;
    const difficultyHolder = createElement("div", {}, "difficultyManager");
    difficultyHolder.append(difficultyIcons, difficultyText);
    difficulty.append(difficultyHolder);
    const fancyness = createElement("div", { style: { fontWeight: "bold" } }, "text");
    fancyness.innerText = "Fancyness: ";
    const fancynessText = createElement("span", { style: { fontWeight: "normal" } }, "text");
    fancynessText.innerText = fancy;
    fancyness.append(fancynessText);
    metaData.append(time, difficulty, fancyness);
    header.append(titleHolder, metaData);
    return header;
};
const buildIngredients = (ingredients) => {
    const list = createElement("ul");
    ingredients.forEach((ing) => {
        const entry = createElement("li", {}, "text", "ingredient");
        entry.innerText = `${ing.amount} ${ing.ingredient} `;
        const modifier = createElement("span", {}, "text", "appendix");
        modifier.innerText = ing.modifier;
        entry.append(modifier);
        list.append(entry);
    });
    return list;
};
const buildSteps = (steps) => {
    const list = createElement("div");
    steps.forEach((step) => {
        const stepHolder = createElement("div", {
            style: { borderBottom: "2px solid black" },
        });
        const title = createElement("div", {}, "text", "big");
        title.innerText = step.title;
        const ingredients = buildIngredients(step.ingredients);
        const description = createElement("div", {}, "text", "recipeDescription");
        description.innerText = step.description;
        stepHolder.append(title, ingredients, description);
        list.append(stepHolder);
    });
    return list;
};
const buildRecipeBody = (recipe) => {
    const body = createElement("div");
    const ingredientHolder = createElement("div", {
        style: { borderBottom: "2px solid black" },
    });
    const ingredientTitle = createElement("div", {}, "big", "text");
    ingredientTitle.innerText = "Zutaten:";
    const ingredients = buildIngredients(recipe.Ingredients);
    ingredientHolder.append(ingredientTitle, ingredients);
    const steps = buildSteps(recipe.Steps);
    body.append(ingredientHolder, steps);
    return body;
};
const buildRecipe = ({ recipe, fancy }) => {
    if (recipe.image === "") {
        recipe.image = "essen.png";
    }
    const site = buildBaseSite();
    const header = buildHeader(recipe.image, recipe.MetaData, fancy);
    const recipeBody = buildRecipeBody(recipe);
    site.append(header, recipeBody);
    body.append(site);
    console.log(recipe, fancy);
};
const RecipeBuilder = {
    start: () => {
        EventBUS.registerEventListener("buildRecipe", {}, buildRecipe);
    },
};
export default RecipeBuilder;
