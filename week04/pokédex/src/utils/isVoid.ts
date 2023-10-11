const isVoid = (item: unknown): item is undefined | null => {
  return item === undefined || item === null;
};

export default isVoid;
