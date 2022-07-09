import axios from "axios";
import {
  ADD_SHIPPING_ADDRESS_REQUEST,
  ADD_SHIPPING_ADDRESS_SUCCESS,
  ADD_SHIPPING_ADDRESS_FAIL,
} from "../../constants/checkout/addShippingAddress";

export const addShippingAddress = (address) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_SHIPPING_ADDRESS_REQUEST,
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
    const { data } = await axios.post(
      `/api/users/${userInfo._id}/shipping`,
      address,
      config
    );
    dispatch({
      type: ADD_SHIPPING_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_SHIPPING_ADDRESS_FAIL,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
