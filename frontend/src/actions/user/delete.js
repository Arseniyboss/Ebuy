import axios from "axios";
import {
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
} from "../../constants/user/delete";

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
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
    await axios.delete(`/api/users/${id}`, config);
    dispatch({
      type: USER_DELETE_SUCCESS,
    });
    dispatch({
      type: USER_DELETE_RESET,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
