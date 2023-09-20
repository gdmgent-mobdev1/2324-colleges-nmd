const name = "Michael"; // string
const age = 31; // number
const pi = 3.14; // number;
const isWednesday = true; // boolean
let firstName; // undefined

const movie = {
  title: "Fight Club",
  rating: 9, // ofzo
  releaseDate: 1990,
}; // object

const movieInfo = {
  actors: ["Brad Pitt", "Edward Norton"],
  director: "David Fincher",
  releaseDate: 1999,
};

// objecten samen voegen in NIEUW object
const movieFullInfo = { ...movie, ...movieInfo };
console.log(movieFullInfo);

const foodOne = [
  {
    name: "Spaghetti",
    origin: "Italy",
  },
  {
    name: "Frieten",
    origin: "Belgium",
  },
]; // array

const foodTwo = [
  {
    name: "Sushi",
    origin: "Japan",
  },
  {
    name: "Taco's",
    origin: "Mexico",
  },
];

const food = [...foodOne, ...foodTwo, ...foodTwo];
console.log(food); // new array!
