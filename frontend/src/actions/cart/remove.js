import axios from "axios";
import {
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
} from "../../constants/cart/remove";

export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM_REQUEST,
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
    const { data } = await axios.delete(
      `/api/users/${userInfo._id}/cartItem/${id}`,
      config
    );
    dispatch({
      type: CART_REMOVE_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_REMOVE_ITEM_FAIL,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
