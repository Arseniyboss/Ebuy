import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { addOrderItems } from "../controllers/order/addOrderItems.js";
import { getOrderById } from "../controllers/order/getOrderById.js";
import { updateOrderToPaid } from "../controllers/order/updateOrderToPaid.js";
import { updateOrderToDelivered } from "../controllers/order/updateOrderToDelivered.js";
import { getMyOrders } from "../controllers/order/getMyOrders.js";
import { getOrders } from "../controllers/order/getOrders.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
