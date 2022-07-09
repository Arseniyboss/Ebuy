import axios from "axios";
import {
  CART_UPDATE_ITEM_REQUEST,
  CART_UPDATE_ITEM_SUCCESS,
  CART_UPDATE_ITEM_FAIL,
} from "../../constants/cart/update";

export const updateCartItem = (id, item) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_UPDATE_ITEM_REQUEST,
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
      `/api/users/${userInfo._id}/cartItem/${id}`,
      item,
      config
    );
    dispatch({
      type: CART_UPDATE_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_UPDATE_ITEM_FAIL,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
