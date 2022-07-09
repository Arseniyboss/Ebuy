import { combineReducers } from "redux";
import { orderCreateReducer } from "./create";
import { orderDetailsReducer } from "./details";
import { orderPayReducer } from "./pay";
import { orderDeliverReducer } from "./deliver";
import { orderListMyReducer } from "./listMy";
import { orderListReducer } from "./list";

export const orderReducer = combineReducers({
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
});
