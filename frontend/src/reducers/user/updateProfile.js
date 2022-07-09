import {
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
} from "../../constants/user/updateProfile";

const initialState = {
  loading: true,
};

export const userUpdateProfileReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return initialState;
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: payload };
    case USER_UPDATE_PROFILE_RESET:
      return initialState;
    default:
      return state;
  }
};
