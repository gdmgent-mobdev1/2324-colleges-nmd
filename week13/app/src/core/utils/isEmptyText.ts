const isEmptyText = (value: unknown): value is null | undefined | "" => {
  return value === null || value === undefined || value === "";
};

export default isEmptyText;
