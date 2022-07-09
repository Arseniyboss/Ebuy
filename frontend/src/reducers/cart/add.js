import {
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_RESET,
} from "../../constants/cart/add";

const initialState = {
  loading: false,
  cartItems: [],
};

export const addToCartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CART_ADD_ITEM_REQUEST:
      return { ...state, loading: true };
    case CART_ADD_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
        cartItems: payload,
      };
    case CART_ADD_ITEM_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case CART_ADD_ITEM_RESET:
      return initialState;
    default:
      return state;
  }
};
