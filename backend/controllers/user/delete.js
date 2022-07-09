import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.status(200).json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
