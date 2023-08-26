var Fancyness;
(function (Fancyness) {
    Fancyness[Fancyness["fast"] = 0] = "fast";
    Fancyness[Fancyness["normal"] = 1] = "normal";
    Fancyness[Fancyness["extra"] = 2] = "extra";
})(Fancyness || (Fancyness = {}));
var Difficulties;
(function (Difficulties) {
    Difficulties[Difficulties["easy"] = 0] = "easy";
    Difficulties[Difficulties["medium"] = 1] = "medium";
    Difficulties[Difficulties["hard"] = 2] = "hard";
    Difficulties[Difficulties["iter"] = 3] = "iter";
})(Difficulties || (Difficulties = {}));
export { Fancyness, Difficulties, };
