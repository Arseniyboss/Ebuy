import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Token is invalid or has expired");
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.status(204).send();
});
