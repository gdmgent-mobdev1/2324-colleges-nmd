const brands = [
  {
    name: "Adidas",
    sector: "clothing",
    origin: "Germany",
    birthYear: 1970,
  },
  {
    name: "Carhartt",
    sector: "clothing",
    origin: "USA",
    birthYear: 1980,
  },
  {
    name: "Audi",
    sector: "automotive",
    origin: "Germany",
    birthYear: 1965,
  },
  {
    name: "Dell",
    sector: "computers",
    origin: "USA",
    birthYear: 1984,
  },
  {
    name: "Boni",
    sector: "food",
    origin: "Belgium",
    birthYear: 1990,
  },
  {
    name: "Arteveldehogeschool",
    sector: "education",
    origin: "Belgium",
    birthYear: 2000,
  },
];

// for
for (let i = 0; i < brands.length; i++) {
  console.log(brands[i].name);
}

// forEach
brands.forEach((brand) => {
  console.log(brand.name);
});

// for ... of
for (const brand of brands) {
  console.log(brand.name);
}

for (const { name } of brands) {
  console.log(name);
}

// for ... in -> objecten
const adidas = brands[0];
for (const value in adidas) {
  console.log(value);
  console.log(adidas[value]);
}

// map = conversie naar andere array
// past originele array niet aan!
// originele array length === nieuwe array length
const names = brands.map((brand) => {
  return `${brand.name} is een merk`;
});
console.log(names);

// filter = een array naar een array
// past originele array niet aan!
// originele array length !== nieuwe array length (0 of meer)
const filtered = brands.filter((brand) => {
  return brand.origin === "Belgium";
});
console.log(filtered);

// find = een array naar één item of undefined
// eerste item dat true terug geeft wordt gekozen
const brand = brands.find((brand) => {
  return brand.name === "Dell";
});
console.log(brand); // object van Dell

// join en split zijn het omgekeerde van elkaar
const name = "Michael geeft MobDev1";
// split = van string naar array
console.log(name.split(" ")); // [ 'Michael', 'geeft', 'MobDev1' ]

// join = van array naar string
const array = ["MobDev1", "is", "leuk"];
console.log(array.join(" "));

// reduce
const numbers = [10, 40, 39, 28, 30, 40, 200];
const sum = numbers.reduce((current, item) => {
  return current + item; // 0 + 10
}, 0);
console.log(sum);

const oldestBrand = brands.reduce((current, item) => {
  if (current) {
    if (current.birthYear < item.birthYear) {
      return current;
    } else {
      return item;
    }
  }
  return item;
}, null);
console.log(oldestBrand);
