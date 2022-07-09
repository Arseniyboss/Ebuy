import asyncHandler from "express-async-handler";
import Order from "../../models/orderModel.js";
import { currentDate } from "../../utils/currentDate.js";

export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = currentDate();

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
