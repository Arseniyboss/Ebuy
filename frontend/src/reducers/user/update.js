import {
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from "../../constants/user/update";

const initialState = {
  loading: true,
  user: {},
};

export const userUpdateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_UPDATE_REQUEST:
      return initialState;
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: payload };
    case USER_UPDATE_RESET:
      return initialState;
    default:
      return state;
  }
};
