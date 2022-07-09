import {
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
  CART_REMOVE_ITEM_RESET,
} from "../../constants/cart/remove";

const initialState = {
  loading: true,
};

export const removeFromCartReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case CART_REMOVE_ITEM_REQUEST:
      return initialState;
    case CART_REMOVE_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CART_REMOVE_ITEM_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case CART_REMOVE_ITEM_RESET:
      return initialState;
    default:
      return state;
  }
};
