// fetch promise
fetch("https://pokeapi.co/api/v2/pokemon/")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.log(error));

const fetchPokemon = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};

// zelf promise
const waitASecond = (message) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(message);
    }, 1000);
  });
};

waitASecond("Hallo").then((message) => console.log(message));
