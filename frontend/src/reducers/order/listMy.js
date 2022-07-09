import {
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
} from "../../constants/order/listMy";

const initialState = {
  loading: true,
  orders: [],
};

export const orderListMyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDER_LIST_MY_REQUEST:
      return initialState;
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: payload,
      };
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case ORDER_LIST_MY_RESET:
      return initialState;
    default:
      return state;
  }
};
