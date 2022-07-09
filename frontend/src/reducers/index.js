import { combineReducers } from "redux";
import { cartReducer } from "./cart";
import { orderReducer } from "./order";
import { productReducer } from "./product";
import { checkoutReducer } from "./checkout";
import { userReducer } from "./user";

export const reducer = combineReducers({
  cart: cartReducer,
  checkout: checkoutReducer,
  order: orderReducer,
  product: productReducer,
  user: userReducer,
});
