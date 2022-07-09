import {
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAIL,
  CLEAR_CART_RESET,
} from "../../constants/cart/clear";

const initialState = {
  loading: true,
};

export const clearCartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_CART_REQUEST:
      return initialState;
    case CLEAR_CART_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CLEAR_CART_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case CLEAR_CART_RESET:
      return initialState;
    default:
      return state;
  }
};
