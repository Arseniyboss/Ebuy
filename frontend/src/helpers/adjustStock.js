import { updateStock } from "../actions/product/updateStock";

export const adjustStock = (dispatch, cartItems, products) => {
  const adjustedStock = [];
  const adjustedState = [];

  cartItems.map((item) => {
    const id = item._id;
    const countInStock = item.countInStock - item.quantity;
    adjustedStock.push({ id, countInStock });
    return adjustedStock;
  });

  adjustedStock.forEach((item) => {
    products.map((product) => {
      if (item.id === product._id) {
        product.countInStock = item.countInStock;
        adjustedState.push({
          _id: product._id,
          countInStock: product.countInStock,
        });
      }
      return adjustedState;
    });
  });

  adjustedState.forEach((item) => {
    dispatch(updateStock({ _id: item._id, countInStock: item.countInStock }));
  });
};
