import { ListItem, PaginatedResults, Pagination } from "../api/types";
import * as Detail from "./Detail";
import { fetchPokemon } from "../modules/pokemon/api";
import getIdFromUrl from "../utils/getIdFromUrl";
import isVoid from "../utils/isVoid";
import ErrorView from "./design/ErrorView";
import LoadingIndicator from "./design/LoadingIndicator";
import * as Storage from "../storage";

const $list = document.getElementById("list");
const $btnPaginationPrev = document.getElementById("btn-pagination-prev");
const $btnPaginationNext = document.getElementById("btn-pagination-next");
const $paginationPage = document.getElementById("pagination-page");
const $inputLimit = document.getElementById("input-settings-limit");
const $btnApplySettings = document.getElementById("btn-apply-settings");

const getListLayout = (item: ListItem) => {
  return `
    <li class="card pokemon-item" data-id="${getIdFromUrl(item.url)}">
      ${item.name}
    </li>
  `;
};

const setListLayout = (data: PaginatedResults<ListItem>) => {
  if (data.page === 1) {
    $btnPaginationPrev?.setAttribute("disabled", "disabled");
  } else {
    $btnPaginationPrev?.removeAttribute("disabled");
  }
  if (data.page === data.totalPages) {
    $btnPaginationNext?.setAttribute("disabled", "disabled");
  } else {
    $btnPaginationNext?.removeAttribute("disabled");
  }
  if ($paginationPage) {
    $paginationPage.innerText = `${data.page} / ${data.totalPages}`;
  }
  if ($inputLimit instanceof HTMLInputElement) {
    $inputLimit.value = String(data.limit);
  }
  if ($list) {
    $list.innerHTML = data.results.map((p) => getListLayout(p)).join("");
  }
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
        setListLayout(data);
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
  if ($btnApplySettings) {
    $btnApplySettings.addEventListener("click", function () {
      if ($inputLimit instanceof HTMLInputElement) {
        const newLimit = parseInt($inputLimit.value);
        setLimit(newLimit);
      }
    });
  }
  // pagination
  if ($btnPaginationPrev) {
    $btnPaginationPrev.addEventListener("click", function () {
      setPage(data.page - 1);
    });
  }
  if ($btnPaginationNext) {
    $btnPaginationNext.addEventListener("click", function () {
      setPage(data.page + 1);
    });
  }
};

export { init };
