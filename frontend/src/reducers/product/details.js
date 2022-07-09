import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_RESET,
} from "../../constants/product/details";

const initialState = {
  loading: true,
  product: {
    reviews: [],
  },
};

export const productDetailsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return initialState;
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_DETAILS_RESET:
      return initialState;
    default:
      return state;
  }
};
