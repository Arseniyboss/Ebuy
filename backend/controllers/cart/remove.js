import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

export const removeCartItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { itemId } = req.params;

  const item = user.cartItems.find((item) => item.id === itemId);

  if (user && item) {
    await item.remove();
    await user.save();
    res.status(200).json(user);
  }
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
});
