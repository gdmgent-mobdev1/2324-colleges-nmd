const $box = document.getElementById("box");
const $btnRandom = document.getElementById("btn-random");
const $list = document.getElementById("list");

const colors = [];

const getRandomNumber = () => {
  return Math.floor(Math.random() * 256); // 0 tot 0,99 * 256
};

const getRandomColor = () => {
  return `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
};

const onButtonClick = () => {
  const color = getRandomColor();
  $box.style.backgroundColor = color;
  // add random color to colors array
  colors.push(color);
  // old-school
  const $item = document.createElement("li");
  $item.style.backgroundColor = color;
  // add li-item to list
  $list.appendChild($item);
};

// add event listener
$btnRandom.addEventListener("click", onButtonClick);
