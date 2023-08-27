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
};
