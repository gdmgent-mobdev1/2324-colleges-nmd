const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 },
];

const filterByProperty = (array, property, value) => {
  return array.filter((item) => {
    return item[property] === value;
  });
};

const filteredPeople = filterByProperty(people, "age", 25);
console.log(filteredPeople);
