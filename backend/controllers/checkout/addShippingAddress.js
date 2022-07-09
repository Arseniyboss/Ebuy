import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

export const addShippingAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.checkout = user.checkout || {};
    user.checkout.shippingAddress = req.body;
    await user.save();
    res.status(201).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
