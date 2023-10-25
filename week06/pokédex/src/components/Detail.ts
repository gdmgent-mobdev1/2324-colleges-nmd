import { fetchPokemonById } from "../modules/pokemon/api";
import { Pokemon, SpriteSet } from "../modules/pokemon/types";
import isVoid from "../utils/isVoid";
import ErrorView from "./design/ErrorView";
import LoadingIndicator from "./design/LoadingIndicator";
import * as Storage from "../storage";

const $detail = document.getElementById("detail");

const getSpriteTitle = (key: string) => {
  switch (key) {
    case "dream_world":
      return "Dream World";
    case "home":
      return "Default";
    case "official-artwork":
      return "Official Artwork";
    default:
      return key;
  }
};

const ImageButtons = (sprites: SpriteSet, activeKey: string) => {
  let buttons = "";
  for (const key in sprites) {
    buttons += `
      <li class="btn-list__item ${key === activeKey ? "btn-list__item--active" : ""}">
        <button class="btn-toggle-img" data-type="${key}">${getSpriteTitle(key)}</button>
      </li>
    `;
  }
  return `
    <ul class="btn-list">${buttons}</ul>
  `;
};

const Detail = (pokemon: Pokemon, spriteKey: string) => {
  return `
      <div class="detail card card--large">
        <img class="detail__img" src="${pokemon.sprites.other[spriteKey].front_default}" alt="${
    pokemon.name
  }" />
        ${ImageButtons(pokemon.sprites.other, spriteKey)}
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

let id: string | null = Storage.getDetailId();
let spriteKey: string = Storage.getSpriteKey() ?? "home";

const setSpriteKey = (key: string) => {
  spriteKey = key;
  Storage.setSpriteKey(key);
  reRender();
};

const setId = (newId: string) => {
  Storage.setDetailId(newId);
  id = newId;
  reRender();
};

const reRender = () => {
  render(id);
};

const init = () => {
  if (id) {
    render(id);
  }
};

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
        $detail.innerHTML = Detail(data, spriteKey);
        addEventListeners();
      }
    })
    .catch((error) => {
      $detail.innerHTML = ErrorView(String(error));
    });
};

const addEventListeners = () => {
  const $items = document.querySelectorAll(".btn-toggle-img");
  for (const $item of $items) {
    $item.addEventListener("click", (e) => {
      if (e.currentTarget instanceof HTMLElement && e.currentTarget.dataset.type) {
        const key = e.currentTarget.dataset.type;
        setSpriteKey(key);
      }
    });
  }
};

export { init, setId };
