import {
  PRODUCT_TOP_RATED_REQUEST,
  PRODUCT_TOP_RATED_SUCCESS,
  PRODUCT_TOP_RATED_FAIL,
  PRODUCT_TOP_RATED_RESET,
} from "../../constants/product/topRated";

const initialState = {
  loading: true,
  products: [],
};

export const productTopRatedReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_TOP_RATED_REQUEST:
      return initialState;
    case PRODUCT_TOP_RATED_SUCCESS:
      return { loading: false, products: payload };
    case PRODUCT_TOP_RATED_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_TOP_RATED_RESET:
      return initialState;
    default:
      return state;
  }
};
