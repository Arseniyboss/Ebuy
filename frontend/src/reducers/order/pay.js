import {
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
} from "../../constants/order/pay";

const initialState = {
  loading: false,
};

export const orderPayReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case ORDER_PAY_RESET:
      return initialState;
    default:
      return state;
  }
};
