export const search = (item, value) => {
  return item?.toLowerCase().startsWith(value.toLowerCase());
};
