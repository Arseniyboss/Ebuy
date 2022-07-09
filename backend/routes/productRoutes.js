import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getAllProducts } from "../controllers/product/getAllProducts.js";
import { getPublishedProducts } from "../controllers/product/getPublishedProducts.js";
import { getProductById } from "../controllers/product/getProductById.js";
import { deleteProduct } from "../controllers/product/delete.js";
import { createProduct } from "../controllers/product/create.js";
import { updateProduct } from "../controllers/product/update.js";
import { createProductReview } from "../controllers/product/createReview.js";
import { getTopProducts } from "../controllers/product/getTopProducts.js";
import { updateStock } from "../controllers/product/updateStock.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.route("/published").get(getPublishedProducts);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, updateStock)
  .delete(protect, admin, deleteProduct);
router.route("/:id/edit").put(protect, admin, updateProduct);

export default router;
