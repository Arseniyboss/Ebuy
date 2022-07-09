export const getCommonItems = (items) => {
  return items
    .shift()
    .filter((item) => items.every((array) => array.includes(item)));
};
