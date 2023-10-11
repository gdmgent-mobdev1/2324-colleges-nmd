import { fetchPokemon } from "./modules/pokemon/api";
import "./style/reset.css";
import "./style/style.css";
import isVoid from "./utils/isVoid";

const $list = document.getElementById("list");

const getErrorHTML = (error: string) => {
  return `<p class="error">${error}</p>`;
};

const getLoadingHTML = () => {
  return `<span class="loading"></span>`;
};

const initApp = async () => {
  if ($list) {
    $list.innerHTML = getLoadingHTML();
    await renderLayout();
  }
};

const renderLayout = async () => {
  try {
    const pokemon = await fetchPokemon();
    if (!isVoid(pokemon) && $list) {
      $list.innerHTML = `
        <ul>
          ${pokemon.results
            .map(
              (p) => `
            <li class="card pokemon-item" data-name="${p.name}">
              ${p.name}
            </li>
          `
            )
            .join("")}
        </ul>
      `;

      addEventListeners();
    }
  } catch (error) {
    if ($list) {
      $list.innerHTML = getErrorHTML(String(error));
    }
  }
};

const addEventListeners = () => {
  const $items = document.querySelectorAll(".pokemon-item");
  for (const $item of $items) {
    $item.addEventListener("click", function (e) {
      if (e.currentTarget instanceof HTMLElement) {
        window.alert(e.currentTarget.dataset.name);
      }
    });
  }
};

await initApp();
