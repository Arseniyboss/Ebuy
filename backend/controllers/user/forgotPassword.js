import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import { generateAccessToken } from "../../utils/token/generateAccessToken.js";
import { sendVerificationEmail } from "../../utils/user/sendVerificationEmail.js";
import { sendResetEmail } from "../../utils/user/sendResetEmail.js";

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User doesn't exist");
  }

  if (user.emailVerificationToken) {
    sendVerificationEmail(
      user.email,
      user.name,
      user.emailVerificationToken,
      user._id
    );
    res.status(400);
    throw new Error("Verify your email");
  }

  user.resetPasswordToken = generateAccessToken();

  const hour = 60 * 60 * 1000;

  user.resetPasswordExpires = Date.now() + hour;

  await user.save();

  sendResetEmail(user.email, user.name, user.resetPasswordToken);

  res.status(204).send();
});
