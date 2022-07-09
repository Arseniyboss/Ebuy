import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../../constants/user/register";

const initialState = {
  loading: true,
};

export const userRegisterReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return initialState;
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true };
    case USER_REGISTER_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
