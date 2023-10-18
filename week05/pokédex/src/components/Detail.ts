import { fetchPokemonById } from "../modules/pokemon/api";
import { Pokemon } from "../modules/pokemon/types";
import isVoid from "../utils/isVoid";
import ErrorView from "./design/ErrorView";
import LoadingIndicator from "./design/LoadingIndicator";

const $detail = document.getElementById("detail");

const Detail = (pokemon: Pokemon) => {
  return `
      <div class="detail card card--large">
        <img class="detail__img" src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}" />
        <h2 class="detail__title">${pokemon.name}</h2>
        <ul class="detail__info">
          <li>Height: ${pokemon.height * 10}cm</li>
          <li>Weight: ${pokemon.weight}kg</li>
          <li>Base experience: ${pokemon.base_experience}</li>
          <li>Types: ${pokemon.types.map((t) => t.type.name).join(", ")}</li>
        </ul>
      </div>
    `;
};

const init = () => {};

const render = (id?: string | null) => {
  if (!$detail) {
    return;
  }

  if (isVoid(id)) {
    $detail.innerHTML = "";
    return;
  }

  $detail.innerHTML = LoadingIndicator();
  fetchPokemonById(id)
    .then((data) => {
      if (!isVoid(data)) {
        $detail.innerHTML = Detail(data);
      }
    })
    .catch((error) => {
      $detail.innerHTML = ErrorView(String(error));
    });
};

export { init, render };
