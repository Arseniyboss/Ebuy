import {
  UPDATE_PAYMENT_METHOD_REQUEST,
  UPDATE_PAYMENT_METHOD_SUCCESS,
  UPDATE_PAYMENT_METHOD_FAIL,
  UPDATE_PAYMENT_METHOD_RESET,
} from "../../constants/checkout/updatePaymentMethod";

const initialState = {
  loading: false,
  paymentMethod: "",
};

export const updatePaymentMethodReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case UPDATE_PAYMENT_METHOD_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PAYMENT_METHOD_SUCCESS:
      return {
        loading: false,
        success: true,
        paymentMethod: payload,
      };
    case UPDATE_PAYMENT_METHOD_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case UPDATE_PAYMENT_METHOD_RESET:
      return initialState;
    default:
      return state;
  }
};
