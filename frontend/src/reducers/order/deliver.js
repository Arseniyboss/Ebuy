import {
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from "../../constants/order/deliver";

const initialState = {
  loading: false,
};

export const orderDeliverReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case ORDER_DELIVER_RESET:
      return initialState;
    default:
      return state;
  }
};
