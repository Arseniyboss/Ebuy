import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

export const updatePaymentMethod = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { paymentMethod } = req.body;

  if (user) {
    user.checkout = user.checkout || {};
    user.checkout.paymentMethod = paymentMethod;
    await user.save();
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
