const getIdFromUrl = (url: string): string => {
  return url.split("/").reverse()[1];
};

export default getIdFromUrl;
