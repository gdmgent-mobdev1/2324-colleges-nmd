var Animal = /** @class */ (function () {
    function Animal(type) {
        this.type = type;
    }
    Animal.prototype.sayType = function () {
        console.log("I am a ".concat(this.type));
    };
    return Animal;
}());
var animal = new Animal("dog");
animal.sayType();
var animal2 = new Animal("penguin");
animal2.sayType();
console.log(animal2.type);
animal2.type = "Zebra";
animal2.sayType();
