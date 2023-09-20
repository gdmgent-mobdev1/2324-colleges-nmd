const sneaker = {
  brand: "Nike",
  model: "Air Force 1",
  color: "black",
  price: 130,
};

const { model, brand, ...rest } = sneaker;
console.log(sneaker); // object niet aangepast
console.log(rest); // nieuw object
console.log(`${model} by ${brand}`);

const animals = ["Dog", "Donkey", "Camel", "Cat", "Bird"];
// originele array is niet gewijzigd!
const [firstItem, secondItem, ...array] = animals;
console.log(firstItem); // dog
console.log(secondItem); // donkey
console.log(array);
