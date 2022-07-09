import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

export const verifyEmail = asyncHandler(async (req, res) => {
  const { id, token } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.emailVerificationToken !== token) {
    res.status(400);
    throw new Error("Token is invalid");
  }

  user.emailVerificationToken = undefined;

  await user.save();

  res.status(204).send();
});
