import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
} from "../../constants/user/list";

const initialState = {
  loading: true,
  users: [],
};

export const userListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LIST_REQUEST:
      return initialState;
    case USER_LIST_SUCCESS:
      return { loading: false, users: payload };
    case USER_LIST_FAIL:
      return { loading: false, error: payload };
    case USER_LIST_RESET:
      return initialState;
    default:
      return state;
  }
};
