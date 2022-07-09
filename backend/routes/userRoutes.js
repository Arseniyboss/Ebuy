import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { login } from "../controllers/user/login.js";
import { register } from "../controllers/user/register.js";
import { verifyEmail } from "../controllers/user/verifyEmail.js";
import { forgotPassword } from "../controllers/user/forgotPassword.js";
import { resetPassword } from "../controllers/user/resetPassword.js";
import { updateUserProfile } from "../controllers/user/updateProfile.js";
import { getUsers } from "../controllers/user/getUsers.js";
import { deleteUser } from "../controllers/user/delete.js";
import { getUserById } from "../controllers/user/getUserById.js";
import { updateUser } from "../controllers/user/update.js";
import { addCartItem } from "../controllers/cart/add.js";
import { removeCartItem } from "../controllers/cart/remove.js";
import { updateCartItem } from "../controllers/cart/update.js";
import { clearCart } from "../controllers/cart/clear.js";
import { addShippingAddress } from "../controllers/checkout/addShippingAddress.js";
import { updatePaymentMethod } from "../controllers/checkout/updatePaymentMethod.js";

const router = express.Router();

router.route("/").post(register).get(protect, admin, getUsers);
router.post("/login", login);
router.get("/:id/verify/:token", verifyEmail);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword/:token", resetPassword);
router.route("/profile").put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, deleteUser)
  .get(protect, getUserById)
  .put(protect, admin, updateUser);
router.route("/:id/cartItem").post(protect, addCartItem);
router
  .route("/:userId/cartItem/:itemId")
  .delete(protect, removeCartItem)
  .put(protect, updateCartItem);
router.route("/:id/cartItems").delete(protect, clearCart);
router.route("/:id/shipping").post(protect, addShippingAddress);
router.route("/:id/payment").put(protect, updatePaymentMethod);

export default router;
