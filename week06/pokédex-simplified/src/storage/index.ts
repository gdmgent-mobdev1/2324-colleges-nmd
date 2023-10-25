import { Pagination } from "../api/types";

const KEY_DETAIL_ID = "detail_id";
const KEY_SPRITE_KEY = "sprite_key";
const KEY_PAGINATION = "pagination";

const getDetailId = (): string | null => {
  return localStorage.getItem(KEY_DETAIL_ID);
};

const setDetailId = (id: string) => {
  localStorage.setItem(KEY_DETAIL_ID, id);
};

const getPagination = (): Pagination | null => {
  const pagination = localStorage.getItem(KEY_PAGINATION);
  if (pagination) {
    return JSON.parse(pagination);
  }
  return null;
};

const setPagination = (pagination: Pagination) => {
  localStorage.setItem(KEY_PAGINATION, JSON.stringify(pagination));
};

const getSpriteKey = (): string | undefined | null => {
  return localStorage.getItem(KEY_SPRITE_KEY);
};

const setSpriteKey = (type: string) => {
  localStorage.setItem(KEY_SPRITE_KEY, type);
};

export { getDetailId, setDetailId, getSpriteKey, setSpriteKey, setPagination, getPagination };
