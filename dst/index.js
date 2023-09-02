import HomeBuilder from "./Home.js";
import RecipeBuilder from "./RecipeBuilder.js";
import RecipeLoader from "./RecipeLoader.js";
import Router from "./Router.js";
RecipeLoader.start();
RecipeBuilder.start();
HomeBuilder.start();
const searchParams = window.location.search;
Router.navigate(searchParams);
