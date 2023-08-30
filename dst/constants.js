import { body, createElement } from "./DOM.js";
var Fancyness;
(function (Fancyness) {
    Fancyness[Fancyness["fast"] = 0] = "fast";
    Fancyness[Fancyness["normal"] = 1] = "normal";
    Fancyness[Fancyness["extra"] = 2] = "extra";
})(Fancyness || (Fancyness = {}));
var Ratings;
(function (Ratings) {
    Ratings[Ratings["experiment"] = 0] = "experiment";
    Ratings[Ratings["adventure"] = 1] = "adventure";
    Ratings[Ratings["good"] = 2] = "good";
    Ratings[Ratings["divine"] = 3] = "divine";
})(Ratings || (Ratings = {}));
const RatingColorMap = {
    experiment: "red",
    adventure: "yellow",
    good: "green",
    divine: "purple",
};
var Difficulties;
(function (Difficulties) {
    Difficulties[Difficulties["einfach"] = 0] = "einfach";
    Difficulties[Difficulties["mittel"] = 1] = "mittel";
    Difficulties[Difficulties["schwer"] = 2] = "schwer";
    Difficulties[Difficulties["iter"] = 3] = "iter";
})(Difficulties || (Difficulties = {}));
window.addEventListener("resize", function () {
    ScrollHeight();
});
function ScrollHeight() {
    var content = document.querySelectorAll(".parchment");
    var container = document.querySelectorAll(".contain");
    for (let i = 0; i < content.length; i++) {
        if (content[i] == null || container[i] == null)
            break;
        content[i].style.height = container[i].offsetHeight + "px";
    }
}
const buildBaseSite = () => {
    const site = createElement("div", {}, "site");
    const content = createElement("div", {}, "contain");
    const parchment = createElement("div", {}, "parchment");
    site.append(parchment, content);
    const logo = createElement("img", {}, "logo");
    logo.src = "images/logo.png";
    logo.addEventListener("click", () => alert("Home"));
    site.append(logo);
    body.append(site);
    return content;
};
export { Fancyness, Difficulties, RatingColorMap, buildBaseSite, ScrollHeight, };
