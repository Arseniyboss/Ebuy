import {
  USER_VERIFY_EMAIL_REQUEST,
  USER_VERIFY_EMAIL_SUCCESS,
  USER_VERIFY_EMAIL_FAIL,
} from "../../constants/user/verifyEmail";

const initialState = {
  loading: true,
};

export const userVerifyEmailReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case USER_VERIFY_EMAIL_REQUEST:
      return initialState;
    case USER_VERIFY_EMAIL_SUCCESS:
      return { loading: false, success: true };
    case USER_VERIFY_EMAIL_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
