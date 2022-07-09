import {
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
} from "../../constants/user/resetPassword";

const initialState = {};

export const userResetPasswordReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case USER_RESET_PASSWORD_REQUEST:
      return initialState;
    case USER_RESET_PASSWORD_SUCCESS:
      return { success: true };
    case USER_RESET_PASSWORD_FAIL:
      return { error: payload };
    default:
      return state;
  }
};
