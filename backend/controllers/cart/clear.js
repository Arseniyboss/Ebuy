import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

export const clearCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  user.cartItems = [];

  if (user) {
    await user.save();
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
