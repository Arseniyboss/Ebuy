import {
  ADD_SHIPPING_ADDRESS_REQUEST,
  ADD_SHIPPING_ADDRESS_SUCCESS,
  ADD_SHIPPING_ADDRESS_FAIL,
  ADD_SHIPPING_ADDRESS_RESET,
} from "../../constants/checkout/addShippingAddress";

const initialState = {
  loading: false,
  shippingAddress: {},
};

export const addShippingAddressReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ADD_SHIPPING_ADDRESS_REQUEST:
      return { ...state, loading: true };
    case ADD_SHIPPING_ADDRESS_SUCCESS:
      return {
        loading: false,
        success: true,
        shippingAddress: payload,
      };
    case ADD_SHIPPING_ADDRESS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case ADD_SHIPPING_ADDRESS_RESET:
      return initialState;
    default:
      return state;
  }
};
