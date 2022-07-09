import axios from "axios";
import {
  UPDATE_PAYMENT_METHOD_REQUEST,
  UPDATE_PAYMENT_METHOD_SUCCESS,
  UPDATE_PAYMENT_METHOD_FAIL,
} from "../../constants/checkout/updatePaymentMethod";

export const updatePaymentMethod = (method) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PAYMENT_METHOD_REQUEST,
    });
    const {
      user: {
        userLogin: { userInfo },
      },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/users/${userInfo._id}/payment`,
      method,
      config
    );
    dispatch({
      type: UPDATE_PAYMENT_METHOD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PAYMENT_METHOD_FAIL,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
