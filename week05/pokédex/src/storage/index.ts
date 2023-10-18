const KEY_DETAIL_ID = "detail_id";

const getDetailId = (): string | null => {
  return localStorage.getItem(KEY_DETAIL_ID);
};

const setDetailId = (id: string) => {
  localStorage.setItem(KEY_DETAIL_ID, id);
};

export { getDetailId, setDetailId };
