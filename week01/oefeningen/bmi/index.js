const height = prompt("Define your height (m)");
const weight = prompt("Define your weight (kg)");

const calculateBMI = (height, weight) => {
  return weight / (height * height);
};

const bmiToString = (bmi) => {
  let result = "";
  if (bmi > 25) {
    result = "overgewicht";
  } else if (bmi <= 18.5) {
    result = "ondergewicht";
  } else {
    result = "gezond gewicht";
  }
  return `Your BMI is ${bmi}. Je hebt ${result}`;
};

const bmi = calculateBMI(parseFloat(height), parseFloat(weight));

alert(bmiToString(bmi));
