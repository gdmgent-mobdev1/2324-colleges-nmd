const items = ["🍕", "🍔", "🍟"];
const [pizza] = items;
console.log(pizza); // 🍕
const [, hamburger] = items;
console.log(hamburger); // 🍔

const point = {
  x: 10,
  y: 20,
  z: 14,
};
const { x, ...rest } = point;
console.log(x);
console.log(rest);

// functions
const arrowFunction = (callback) => {
  callback();
};

arrowFunction(() => console.log("Hallo"));

// stel we willen een object meegeven
// optie 1
const calculatePoint = (point) => {
  return point.x + point.y;
};

// optie 2
const calculatePointAlt = ({ x, y }) => {
  return x + y;
};

// optie 3
const calculatePointAlt2 = (point) => {
  const { x, y } = point;
  return x + y;
};
