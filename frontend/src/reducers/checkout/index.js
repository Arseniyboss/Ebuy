import { combineReducers } from "redux";
import { addShippingAddressReducer } from "./addShippingAddress";
import { updatePaymentMethodReducer } from "./updatePaymentMethod";

export const checkoutReducer = combineReducers({
  addShippingAddress: addShippingAddressReducer,
  updatePaymentMethod: updatePaymentMethodReducer,
});
