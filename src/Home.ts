import EventBUS from "./EventBUS.js";
import { ScrollHeight, buildBaseSite } from "./constants.js";

const buildHome = () => {
  const site = buildBaseSite();

  ScrollHeight();
};

const HomeBuilder = {
  start: () => {
    EventBUS.registerEventListener("buildHome", {}, buildHome);
  },
};

export default HomeBuilder;
