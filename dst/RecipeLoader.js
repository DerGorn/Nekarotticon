import EventBUS from "./EventBUS.js";
import { Fancyness, } from "./constants.js";
const loadRecipe = async ({ name, fancyness, card, }) => {
    if (typeof fancyness === "string") {
        fancyness = Number(fancyness);
        if (isNaN(fancyness)) {
            console.error("Invalid fancyness. Using default value");
            fancyness = undefined;
        }
    }
    const recipe = await fetch(`recipes/${name}.json`).then((d) => d.json());
    if (fancyness === undefined ||
        !recipe.MetaData.fancyLevels.includes(Fancyness[fancyness])) {
        const minFancyness = recipe.MetaData.fancyLevels[0];
        fancyness = Fancyness[minFancyness];
    }
    const fancy = Fancyness[fancyness];
    const reducedRecipe = {
        image: recipe.image,
        MetaData: {
            date: recipe.MetaData.date,
            rating: recipe.MetaData.rating,
            difficulty: recipe.MetaData.FancyfullDifficulty[fancy],
            fancyLevels: recipe.MetaData.fancyLevels,
            title: recipe.MetaData.title,
            timeNeeded: recipe.MetaData.FancyfullTimeNeeded[fancy],
        },
        Ingredients: recipe.FancyfullIngredients[fancy],
        Steps: recipe.FancyfullSteps[fancy],
        description: recipe.FancyfullDescription[fancy],
    };
    return { recipe: reducedRecipe, fancy, card };
};
const RecipeLoader = {
    start: () => {
        EventBUS.registerEventListener("loadRecipe", {}, async (e) => {
            EventBUS.fireEvent("buildRecipe", await loadRecipe(e));
        });
    },
};
export default RecipeLoader;
