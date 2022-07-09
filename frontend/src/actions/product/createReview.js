import axios from "axios";
import {
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
} from "../../constants/product/createReview";

export const createProductReview =
  (id, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
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
      await axios.post(`/api/products/${id}/reviews`, review, config);
      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: error.response?.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
