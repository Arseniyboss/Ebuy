import {
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
} from "../../constants/user/delete";

const initialState = {
  loading: true,
};

export const userDeleteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_DELETE_REQUEST:
      return initialState;
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: payload };
    case USER_DELETE_RESET:
      return initialState;
    default:
      return state;
  }
};
