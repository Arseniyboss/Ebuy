import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import { generateAuthToken } from "../../utils/token/generateAuthToken.js";
import { sendVerificationEmail } from "../../utils/user/sendVerificationEmail.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!(await user?.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  if (user?.emailVerificationToken) {
    sendVerificationEmail(
      user.email,
      user.name,
      user.emailVerificationToken,
      user._id
    );
    res.status(400);
    throw new Error("Verify your email");
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateAuthToken(user._id),
  });
});
