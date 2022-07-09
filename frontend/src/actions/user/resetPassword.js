import axios from "axios";
import {
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
} from "../../constants/user/resetPassword";

export const resetPassword = (password, token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_RESET_PASSWORD_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.put(`/api/users/resetPassword/${token}`, { password }, config);
    dispatch({
      type: USER_RESET_PASSWORD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_RESET_PASSWORD_FAIL,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
