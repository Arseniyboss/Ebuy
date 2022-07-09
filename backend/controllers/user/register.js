import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import { generateAccessToken } from "../../utils/token/generateAccessToken.js";
import { sendVerificationEmail } from "../../utils/user/sendVerificationEmail.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email is already in use");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  user.emailVerificationToken = generateAccessToken();

  await user.save();

  sendVerificationEmail(
    user.email,
    user.name,
    user.emailVerificationToken,
    user._id
  );

  if (user) {
    res.status(204).send();
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
