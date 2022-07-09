import asyncHandler from "express-async-handler";
import Order from "../../models/orderModel.js";

export const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems } = req.body;

  const order = await Order.create({ ...req.body, user: req.user._id });

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    res.status(201).json(order);
  }
});
