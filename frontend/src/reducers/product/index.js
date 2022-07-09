import { combineReducers } from "redux";
import { productListReducer } from "./list";
import { productDetailsReducer } from "./details";
import { productDeleteReducer } from "./delete";
import { productCreateReducer } from "./create";
import { productUpdateReducer } from "./update";
import { productReviewCreateReducer } from "./createReview";
import { productTopRatedReducer } from "./topRated";
import { productStockUpdateReducer } from "./updateStock";

export const productReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  productStockUpdate: productStockUpdateReducer,
});
