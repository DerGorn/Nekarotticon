const eventTypes = ["loadRecipe", "buildRecipe", "buildHome"];
const registeredFunctions = {
    loadRecipe: [],
    buildRecipe: [],
    buildHome: [],
};
const registerEventListener = (eventType, { index = -1 }, ...listener) => {
    if (index == -1)
        registeredFunctions[eventType].push(...listener);
    else {
        registeredFunctions[eventType].splice(index, 0, ...listener);
    }
};
const fireEvent = async (eventType, event) => {
    registeredFunctions[eventType].forEach((l) => l(event));
};
const EventBUS = {
    registerEventListener,
    fireEvent,
};
export default EventBUS;
