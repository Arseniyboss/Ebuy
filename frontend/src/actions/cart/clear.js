import axios from "axios";
import {
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAIL,
} from "../../constants/cart/clear";

export const clearCart = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLEAR_CART_REQUEST,
    });
    const {
      user: {
        userLogin: { userInfo },
      },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/users/${userInfo._id}/cartItems`, config);
    dispatch({
      type: CLEAR_CART_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CLEAR_CART_FAIL,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
