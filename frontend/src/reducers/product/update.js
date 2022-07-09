import {
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
} from "../../constants/product/update";

const initialState = {
  loading: true,
  product: {},
};

export const productUpdateReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_UPDATE_REQUEST:
      return initialState;
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_UPDATE_RESET:
      return initialState;
    default:
      return state;
  }
};
