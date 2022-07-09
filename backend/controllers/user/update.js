import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  const { email } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists && user.email !== email) {
    res.status(400);
    throw new Error("Email is already in use");
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin =
      req.body.isAdmin === undefined ? user.isAdmin : req.body.isAdmin;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
