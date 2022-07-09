import { combineReducers } from "redux";
import { addToCartReducer } from "./add";
import { removeFromCartReducer } from "./remove";
import { clearCartReducer } from "./clear";
import { updateCartItemReducer } from "./update";

export const cartReducer = combineReducers({
  addToCart: addToCartReducer,
  removeFromCart: removeFromCartReducer,
  clearCart: clearCartReducer,
  updateCartItem: updateCartItemReducer,
});
