import asyncHandler from "express-async-handler";
import Order from "../../models/orderModel.js";

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});
