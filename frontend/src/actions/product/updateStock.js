import axios from "axios";
import {
  PRODUCT_STOCK_UPDATE_REQUEST,
  PRODUCT_STOCK_UPDATE_SUCCESS,
  PRODUCT_STOCK_UPDATE_FAIL,
} from "../../constants/product/updateStock";

export const updateStock = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_STOCK_UPDATE_REQUEST });
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
      `/api/products/${product._id}`,
      product,
      config
    );
    dispatch({
      type: PRODUCT_STOCK_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_STOCK_UPDATE_FAIL,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
