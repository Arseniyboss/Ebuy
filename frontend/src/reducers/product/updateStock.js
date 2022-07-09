import {
  PRODUCT_STOCK_UPDATE_REQUEST,
  PRODUCT_STOCK_UPDATE_SUCCESS,
  PRODUCT_STOCK_UPDATE_FAIL,
  PRODUCT_STOCK_UPDATE_RESET,
} from "../../constants/product/updateStock";

const initialState = {
  loading: true,
  product: {},
};

export const productStockUpdateReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_STOCK_UPDATE_REQUEST:
      return initialState;
    case PRODUCT_STOCK_UPDATE_SUCCESS:
      return { loading: false, product: payload };
    case PRODUCT_STOCK_UPDATE_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_STOCK_UPDATE_RESET:
      return initialState;
    default:
      return state;
  }
};
