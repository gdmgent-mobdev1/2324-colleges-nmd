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
  // new school
  generateColorList();
};

const generateColorList = () => {
  let html = "";
  for (let i = 0; i < colors.length; i++) {
    html += `<li style="background-color: ${colors[i]}"></li>`;
  }
  $list.innerHTML = html;
};

// add event listener
$btnRandom.addEventListener("click", onButtonClick);
