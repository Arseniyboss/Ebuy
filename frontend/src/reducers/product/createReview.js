import {
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
} from "../../constants/product/createReview";

const initialState = {
  loading: true,
};

export const productReviewCreateReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return initialState;
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return initialState;
    default:
      return state;
  }
};
