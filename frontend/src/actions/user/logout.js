import { USER_LOGOUT } from "../../constants/user/login";
import { USER_DETAILS_RESET } from "../../constants/user/details";
import { ORDER_LIST_MY_RESET } from "../../constants/order/listMy";

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("__paypal_storage__");
  localStorage.removeItem("productListFilter");
  localStorage.removeItem("productListPage");
  localStorage.removeItem("userListFilter");
  localStorage.removeItem("userListPage");
  localStorage.removeItem("orderListFilter");
  localStorage.removeItem("orderListPage");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  document.location.href = "/login";
};
