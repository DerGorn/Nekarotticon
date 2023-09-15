const eventTypes = ["loadRecipe", "buildRecipe", "buildHome"];
const registeredFunctions = {
    loadRecipe: [],
    buildRecipe: [],
    buildHome: [],
};
const registeredNamedFunctions = {
    loadRecipe: {},
    buildRecipe: {},
    buildHome: {},
};
const registerEventListener = (eventType, { index = -1, name = "" }, ...listener) => {
    if (name === "") {
        if (index == -1)
            registeredFunctions[eventType].push(...listener);
        else {
            registeredFunctions[eventType].splice(index, 0, ...listener);
        }
    }
    else {
        registeredNamedFunctions[eventType][name] = listener;
    }
};
const removeEventListener = (eventType, name) => {
    delete registeredNamedFunctions[eventType][name];
};
const fireEvent = async (eventType, event) => {
    const array = [
        ...registeredFunctions[eventType],
        ...Object.values(registeredNamedFunctions[eventType]).reduce((all, cur) => [...all, ...cur], []),
    ];
    return Promise.all(array.map((l) => l(event)));
};
const EventBUS = {
    registerEventListener,
    fireEvent,
    removeEventListener,
};
export default EventBUS;
