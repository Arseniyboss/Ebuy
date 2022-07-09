import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_RESET,
} from "../../constants/order/details";

const initialState = {
  loading: true,
  order: [],
};

export const orderDetailsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return initialState;
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case ORDER_DETAILS_RESET:
      return initialState;
    default:
      return state;
  }
};
