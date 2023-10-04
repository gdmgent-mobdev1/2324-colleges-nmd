// destructuring oef. 3
const obj = { first: "James", last: "Baker", alias: "JB" };
const { first = "John", last = "Doe", alias: nickname = "JD" } = obj;
console.log(nickname); // outputs nickname is not defined
