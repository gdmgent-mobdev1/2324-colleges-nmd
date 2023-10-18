import { ApiListResponse, ListItem } from "../api/types";
import * as Detail from "./Detail";
import { fetchPokemon } from "../modules/pokemon/api";
import getIdFromUrl from "../utils/getIdFromUrl";
import isVoid from "../utils/isVoid";
import ErrorView from "./design/ErrorView";
import LoadingIndicator from "./design/LoadingIndicator";

const $list = document.getElementById("list");

const ListItem = (item: ListItem) => {
  return `
    <li class="card pokemon-item" data-id="${getIdFromUrl(item.url)}">
      ${item.name}
    </li>
  `;
};

const List = (data: ApiListResponse<ListItem>) => {
  return `
    <ul>
    ${data.results.map((p) => ListItem(p)).join("")}
    </ul>
    <div class="pagination">
      <button id="pagination-btn-prev">↞</button>
      <span id="pagination-page"></span>
      <button id="pagination-btn-next">↠</button>
    </div>
  `;
};

const init = () => {
  render();
};

const render = async () => {
  if (!$list) {
    return;
  }

  $list.innerHTML = LoadingIndicator();

  fetchPokemon()
    .then((data) => {
      if (!isVoid(data)) {
        $list.innerHTML = List(data);
        addEventListeners();
      }
    })
    .catch((error) => {
      $list.innerHTML = ErrorView(String(error));
    });
};

const addEventListeners = () => {
  const $items = document.querySelectorAll(".pokemon-item");
  for (const $item of $items) {
    $item.addEventListener("click", function (e) {
      if (e.currentTarget instanceof HTMLElement && e.currentTarget.dataset.id) {
        const id = e.currentTarget.dataset.id;
        Detail.render(id);
      }
    });
  }
};

export { init };
