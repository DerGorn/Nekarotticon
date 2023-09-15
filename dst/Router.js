import EventBUS from "./EventBUS.js";
const availableRecipes = await fetch("recipes/availableRecipes.json")
    .then((d) => d.json())
    .then((j) => j.available);
const Router = {
    navigate: async (searchString) => {
        if (searchString[0] !== "?") {
            EventBUS.fireEvent("buildHome", {});
            return;
        }
        console.log(availableRecipes);
        const searchParams = searchString
            .slice(1)
            .split("&")
            .map((s) => s.split("="))
            .reduce((obj, [param, val]) => {
            obj[param] = val;
            return obj;
        }, {});
        console.log(searchParams);
        if (!("name" in searchParams)) {
            window.location.href = "404.html";
            return;
        }
        if (!availableRecipes.includes(searchParams.name)) {
            window.location.href = "404.html";
        }
        EventBUS.fireEvent("loadRecipe", { ...searchParams, card: false });
    },
};
export default Router;
export { availableRecipes };
