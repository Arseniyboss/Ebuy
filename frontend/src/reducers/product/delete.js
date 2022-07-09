import {
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
} from "../../constants/product/delete";

const initialState = {
  loading: true,
};

export const productDeleteReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return initialState;
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_DELETE_RESET:
      return initialState;
    default:
      return state;
  }
};
