(function () {
    var people = [
        { name: "Alice", age: 25 },
        { name: "Bob", age: 30 },
        { name: "Charlie", age: 25 },
    ];
    var filterByProperty = function (array, property, value) {
        return array.filter(function (item) {
            return item[property] === value;
        });
    };
    var filteredPeople = filterByProperty(people, "age", 25);
    console.log(filteredPeople);
    var list = {
        items: [3, 5]
    };
    var list2 = {
        items: people
    };
})();
