import axios from "axios";
import {
  PRODUCT_TOP_RATED_REQUEST,
  PRODUCT_TOP_RATED_SUCCESS,
  PRODUCT_TOP_RATED_FAIL,
} from "../../constants/product/topRated";

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_RATED_REQUEST });

    const { data } = await axios.get("/api/products/top");

    dispatch({
      type: PRODUCT_TOP_RATED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_RATED_FAIL,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
