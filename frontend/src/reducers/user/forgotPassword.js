import {
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
} from "../../constants/user/forgotPassword";

const initialState = {};

export const userForgotPasswordReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case USER_FORGOT_PASSWORD_REQUEST:
      return initialState;
    case USER_FORGOT_PASSWORD_SUCCESS:
      return { success: true };
    case USER_FORGOT_PASSWORD_FAIL:
      return { error: payload };
    default:
      return state;
  }
};
