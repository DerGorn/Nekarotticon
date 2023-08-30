import EventBUS from "./EventBUS.js";
import {
  Difficulty,
  Fancy,
  FancyfullRecipe,
  Fancyness,
  Ingredient,
  Recipe,
  Step,
} from "./constants.js";

const loadRecipe = async ({
  name,
  fancyness,
}: {
  name: string;
  fancyness?: Fancyness;
}): Promise<{ recipe: Recipe; fancy: Fancy }> => {
  if (typeof fancyness === "string") {
    fancyness = Number(fancyness);
    if (isNaN(fancyness)) {
      console.error("Invalid fancyness. Using default value");
      fancyness = undefined;
    }
  }
  const recipe: FancyfullRecipe = await fetch(`recipes/${name}.json`).then(
    (d) => d.json()
  );
  if (
    fancyness === undefined ||
    !recipe.MetaData.fancyLevels.includes(Fancyness[fancyness] as Fancy)
  ) {
    const minFancyness = recipe.MetaData.fancyLevels[0];
    fancyness = Fancyness[minFancyness];
  }
  const fancy = Fancyness[fancyness] as Fancy;
  const reducedRecipe: Recipe = {
    image: recipe.image,
    MetaData: {
      date: recipe.MetaData.date,
      rating: recipe.MetaData.rating,
      difficulty: recipe.MetaData.FancyfullDifficulty[fancy] as Difficulty,
      fancyLevels: recipe.MetaData.fancyLevels,
      title: recipe.MetaData.title,
      timeNeeded: recipe.MetaData.FancyfullTimeNeeded[fancy],
    },
    Ingredients: recipe.FancyfullIngredients[fancy] as Ingredient[],
    Steps: recipe.FancyfullSteps[fancy] as Step[],
    description: recipe.FancyfullDescription[fancy] as string,
  };
  return { recipe: reducedRecipe, fancy };
};

const RecipeLoader = {
  start: () => {
    EventBUS.registerEventListener("loadRecipe", {}, async (e) =>
      EventBUS.fireEvent("buildRecipe", await loadRecipe(e))
    );
  },
};

export default RecipeLoader;
