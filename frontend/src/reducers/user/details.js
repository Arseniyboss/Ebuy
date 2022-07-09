import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
} from "../../constants/user/details";

const initialState = {
  loading: true,
  user: {},
};

export const userDetailsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_DETAILS_REQUEST:
      return initialState;
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: payload, success: true };
    case USER_DETAILS_FAIL:
      return { loading: false, error: payload, success: false };
    case USER_DETAILS_RESET:
      return initialState;
    default:
      return state;
  }
};
