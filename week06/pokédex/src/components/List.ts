import { ListItem, PaginatedResults, Pagination } from "../api/types";
import * as Detail from "./Detail";
import { fetchPokemon } from "../modules/pokemon/api";
import getIdFromUrl from "../utils/getIdFromUrl";
import isVoid from "../utils/isVoid";
import ErrorView from "./design/ErrorView";
import LoadingIndicator from "./design/LoadingIndicator";
import * as Storage from "../storage";

const $list = document.getElementById("list");

const ListItem = (item: ListItem) => {
  return `
    <li class="card pokemon-item" data-id="${getIdFromUrl(item.url)}">
      ${item.name}
    </li>
  `;
};

const List = (data: PaginatedResults<ListItem>) => {
  return `
    <div class="settings">
      <label for="limit">Limit</label>
      <input type="number" id="input-settings-limit" value="${data.limit}" />
      <button id="btn-apply-settings">Apply</button>
    </div>
    <ul>
    ${data.results.map((p) => ListItem(p)).join("")}
    </ul>
    <div class="pagination">
      <button id="btn-pagination-prev" ${data.page === 1 ? "disabled" : ""}>↞</button>
      <span id="pagination-page">${data.page}/${data.totalPages}</span>
      <button id="btn-pagination-next" ${data.page === data.totalPages ? "disabled" : ""}>↠</button>
    </div>
  `;
};

let pagination: Pagination = Storage.getPagination() ?? {
  limit: 20,
  offset: 0,
};
let data: PaginatedResults<ListItem> | null;

const setLimit = (limit: number) => {
  pagination = {
    limit,
    offset: 0,
  };
  Storage.setPagination(pagination);
  reRender();
};

const setPage = (page: number) => {
  pagination = {
    ...pagination,
    offset: (page - 1) * pagination.limit,
  };
  Storage.setPagination(pagination);
  reRender();
};

const init = () => {
  render();
};

const reRender = () => {
  render();
};

const render = async () => {
  if (!$list) {
    return;
  }

  if (isVoid(data)) {
    $list.innerHTML = LoadingIndicator();
  }

  fetchPokemon(pagination)
    .then((results) => {
      if (!isVoid(results)) {
        data = results;
        $list.innerHTML = List(results);
        addEventListeners(results);
      }
    })
    .catch((error) => {
      data = null;
      $list.innerHTML = ErrorView(String(error));
    });
};

const addEventListeners = (data: PaginatedResults<ListItem>) => {
  // list item click
  const $items = document.querySelectorAll(".pokemon-item");
  for (const $item of $items) {
    $item.addEventListener("click", function (e) {
      if (e.currentTarget instanceof HTMLElement && e.currentTarget.dataset.id) {
        const id = e.currentTarget.dataset.id;
        Detail.setId(id);
      }
    });
  }
  // settings
  const $btnApplySettings = document.getElementById("btn-apply-settings");
  if ($btnApplySettings) {
    $btnApplySettings.addEventListener("click", function () {
      const $inputLimit = document.getElementById("input-settings-limit");
      if ($inputLimit instanceof HTMLInputElement) {
        const newLimit = parseInt($inputLimit.value);
        setLimit(newLimit);
      }
    });
  }
  // pagination
  const $btnPaginationPrev = document.getElementById("btn-pagination-prev");
  if ($btnPaginationPrev) {
    $btnPaginationPrev.addEventListener("click", function () {
      setPage(data.page - 1);
    });
  }
  const $btnPaginationNext = document.getElementById("btn-pagination-next");
  if ($btnPaginationNext) {
    $btnPaginationNext.addEventListener("click", function () {
      setPage(data.page + 1);
    });
  }
};

export { init };
