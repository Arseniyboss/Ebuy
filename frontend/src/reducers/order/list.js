import {
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_RESET,
} from "../../constants/order/list";

const initialState = {
  loading: true,
  orders: [],
};

export const orderListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDER_LIST_REQUEST:
      return initialState;
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: payload,
      };
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case ORDER_LIST_RESET:
      return initialState;
    default:
      return state;
  }
};
