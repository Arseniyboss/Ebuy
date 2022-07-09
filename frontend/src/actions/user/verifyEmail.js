import axios from "axios";
import {
  USER_VERIFY_EMAIL_REQUEST,
  USER_VERIFY_EMAIL_SUCCESS,
  USER_VERIFY_EMAIL_FAIL,
} from "../../constants/user/verifyEmail";

export const verifyEmail = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_VERIFY_EMAIL_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.get(`/api/users/${id}/verify/${token}`, config);
    dispatch({
      type: USER_VERIFY_EMAIL_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_VERIFY_EMAIL_FAIL,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
