import asyncHandler from "express-async-handler";
import Order from "../../models/orderModel.js";

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});
