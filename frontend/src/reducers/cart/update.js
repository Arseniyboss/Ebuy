import {
  CART_UPDATE_ITEM_REQUEST,
  CART_UPDATE_ITEM_SUCCESS,
  CART_UPDATE_ITEM_FAIL,
  CART_UPDATE_ITEM_RESET,
} from "../../constants/cart/update";

const initialState = {
  loading: true,
};

export const updateCartItemReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case CART_UPDATE_ITEM_REQUEST:
      return initialState;
    case CART_UPDATE_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CART_UPDATE_ITEM_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case CART_UPDATE_ITEM_RESET:
      return initialState;
    default:
      return state;
  }
};
