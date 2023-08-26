import EventBUS from "./EventBUS.js";

const availableRecipes: string[] = await fetch("recipes/availableRecipes.json")
  .then((d) => d.json())
  .then((j) => j.available);

const Router = {
  navigate: async (searchString: string) => {
    if (searchString[0] !== "?") {
      console.log("HERE: navigate to HomePage");
      return;
    }
    console.log(availableRecipes);
    const searchParams = searchString
      .slice(1)
      .split("&")
      .map((s) => s.split("="))
      .reduce((obj: { [key: string]: string }, [param, val]) => {
        obj[param] = val;
        return obj;
      }, {});
    console.log(searchParams);
    if (!("name" in searchParams)) {
      console.log("HERE: no name to navigate to");
      return;
    }
    if (!availableRecipes.includes(searchParams.name)) {
      window.location.href = "404.html";
    }
    EventBUS.fireEvent("loadRecipe", searchParams as { name: string });
  },
};

export default Router;
