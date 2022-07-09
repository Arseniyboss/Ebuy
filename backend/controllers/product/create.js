import asyncHandler from "express-async-handler";
import Product from "../../models/productModel.js";

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});
