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
export { Fancyness, Difficulties, RatingColorMap, };
