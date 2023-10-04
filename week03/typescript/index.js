(function () {
    // number
    var age = 31;
    // string
    var name = "Michael";
    // boolean
    var isTeacher = true;
    var showAge = function (age) {
        console.log("Age is ".concat(age));
    };
    showAge(age);
    var lector = {
        name: "Evelien",
        lastName: "Rutsaert",
        city: "Melle",
        age: 34,
        hobbies: ["boksen", "muurklimmen"]
    };
    var logPerson = function (lector) {
        console.log("".concat(lector.name, " is ").concat(lector.age, " years old"));
    };
    logPerson(lector);
    var lectors = [
        {
            name: "Evelien",
            lastName: "Rutsaert",
            city: "Melle",
            age: 34,
            hobbies: ["boksen", "muurklimmen"]
        },
        {
            name: "Dieter",
            lastName: "De Weirdt",
            city: "Zulte",
            age: 34,
            hobbies: ["webshops", "fietsen"]
        },
    ];
    var Rating;
    (function (Rating) {
        Rating[Rating["Excellent"] = 5] = "Excellent";
        Rating[Rating["Good"] = 4] = "Good";
        Rating[Rating["Mediocre"] = 3] = "Mediocre";
        Rating[Rating["Bad"] = 2] = "Bad";
        Rating[Rating["Awful"] = 1] = "Awful";
    })(Rating || (Rating = {}));
    var destination = {
        city: "Sanaa",
        country: "Yemen",
        distance: 39399393,
        coordinates: {
            lat: 3.29292929,
            long: 55.4949494
        },
        rating: Rating.Good
    };
    destination.popularDish = "fattah";
})();
