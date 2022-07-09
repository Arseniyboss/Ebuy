import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

export const addCartItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { name } = req.body;

  if (user) {
    const cartItem = {
      ...req.body,
      user: req.user._id,
    };

    const alreadyAdded = user.cartItems.find((item) => item.name === name);

    if (alreadyAdded) {
      res.status(400);
      throw new Error("Item already added");
    }

    user.cartItems.push(cartItem);

    await user.save();
    res.status(201).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
