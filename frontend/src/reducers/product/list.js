import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_RESET,
} from "../../constants/product/list";

const initialState = {
  loading: true,
  products: [],
};

export const productListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return initialState;
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_LIST_RESET:
      return initialState;
    default:
      return state;
  }
};
