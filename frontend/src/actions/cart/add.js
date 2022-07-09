import axios from "axios";
import {
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
} from "../../constants/cart/add";

export const addCartItem = (item) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_ADD_ITEM_REQUEST,
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
      `/api/users/${userInfo._id}/cartItem`,
      item,
      config
    );
    dispatch({
      type: CART_ADD_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
