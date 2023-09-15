//  * Main form of communication between different parts of the code.
//  * With some Typescript shenanigans the Events are type safe and provide
//  * Autocomplete in VSCode

import { Fancy, Fancyness, Recipe } from "./constants.js";

/**
 * List of all possible Events. Basic stepping stone for the type safety
 */
const eventTypes = ["loadRecipe", "buildRecipe", "buildHome"] as const;
/**
 * Converts the eventTypes JavaScript array into a TypeScript type.
 */
type Events = (typeof eventTypes)[number];

/**
 * Each Event has its own array of regisered functions. The functions are defined as
 * generic functions (e: any) => void. The correct typing for each event is guaranteed
 * with registerEventListener, hence a generic function type is ok here.
 */
const registeredFunctions: { [key in Events]: ((e: any) => void)[] } = {
  loadRecipe: [],
  buildRecipe: [],
  buildHome: [],
};
const registeredNamedFunctions: {
  [key in Events]: { [key: string]: ((e: any) => void)[] };
} = {
  loadRecipe: {},
  buildRecipe: {},
  buildHome: {},
};

/**
 * Bundle the Typesignature of each event into one Object. By doing this it can be
 * accessed with a generic Type in registerEventListener and fireEvent
 */
type EventDefinitions = {
  loadRecipe: { name: string; fancyness?: Fancyness; card: boolean };
  buildRecipe: { recipe: Recipe; fancy: Fancy; card: boolean };
  buildHome: {};
};

/**
 * Register a variable amount of eventListener for an event.
 * @param eventType
 * @param index = -1. Optional to specify where in the registeredFunctions array to insert the functions. Defaults to -1, the end of the array
 * @param name = "". Optional to make listener removable.
 * @param listener
 */
const registerEventListener = <K extends Events>(
  eventType: K,
  { index = -1, name = "" }: { index?: number; name?: string },
  ...listener: ((event: EventDefinitions[K]) => void)[]
) => {
  if (name === "") {
    if (index == -1) registeredFunctions[eventType].push(...listener);
    else {
      registeredFunctions[eventType].splice(index, 0, ...listener);
    }
  } else {
    registeredNamedFunctions[eventType as Events][name] = listener;
  }
};

const removeEventListener = <K extends Events>(eventType: K, name: string) => {
  delete registeredNamedFunctions[eventType as Events][name];
};

/**
 * Fires the given event of the given eventType which results in calling all registered Events.
 * @param eventType
 * @param event
 */
const fireEvent = async <K extends Events>(
  eventType: K,
  event: EventDefinitions[K]
) => {
  const array = [
    ...registeredFunctions[eventType],
    ...Object.values(registeredNamedFunctions[eventType]).reduce(
      (all, cur) => [...all, ...cur],
      []
    ),
  ];
  return Promise.all(array.map((l) => l(event)));
};

/**
 * Main form of communication between different parts of the code.
 */
const EventBUS = {
  registerEventListener,
  fireEvent,
  removeEventListener,
};

export default EventBUS;
