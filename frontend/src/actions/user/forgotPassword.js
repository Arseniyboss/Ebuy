import axios from "axios";
import {
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
} from "../../constants/user/forgotPassword";

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FORGOT_PASSWORD_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.post("/api/users/forgotPassword", { email }, config);
    dispatch({
      type: USER_FORGOT_PASSWORD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_FORGOT_PASSWORD_FAIL,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
