import axios from "axios";
import {
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_RESET,
  PRODUCT_DELETE_FAIL,
} from "../../constants/product/delete";

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
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
    await axios.delete(`/api/products/${id}`, config);
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
    dispatch({
      type: PRODUCT_DELETE_RESET,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
