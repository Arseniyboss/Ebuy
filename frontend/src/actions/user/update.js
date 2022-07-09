import axios from "axios";
import {
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../../constants/user/update";
import {
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
} from "../../constants/user/details";

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);
    dispatch({
      type: USER_UPDATE_SUCCESS,
    });
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_DETAILS_RESET,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
