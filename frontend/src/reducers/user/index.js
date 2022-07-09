import { combineReducers } from "redux";
import { userLoginReducer } from "./login";
import { userRegisterReducer } from "./register";
import { userDetailsReducer } from "./details";
import { userUpdateProfileReducer } from "./updateProfile";
import { userListReducer } from "./list";
import { userDeleteReducer } from "./delete";
import { userUpdateReducer } from "./update";
import { userVerifyEmailReducer } from "./verifyEmail";
import { userForgotPasswordReducer } from "./forgotPassword";
import { userResetPasswordReducer } from "./resetPassword";

export const userReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userVerifyEmail: userVerifyEmailReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
});
