export const addZero = (value) => {
  if (value < 10) {
    return "0" + value;
  }
  return value;
};