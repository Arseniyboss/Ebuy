import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
} from "../../constants/product/create";

const initialState = {
  loading: true,
};

export const productCreateReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return initialState;
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_CREATE_RESET:
      return initialState;
    default:
      return state;
  }
};
