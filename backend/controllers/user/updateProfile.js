import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import { generateAuthToken } from "../../utils/token/generateAuthToken.js";

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { email } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists && user.email !== email) {
    res.status(400);
    throw new Error("Email is already in use");
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateAuthToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
