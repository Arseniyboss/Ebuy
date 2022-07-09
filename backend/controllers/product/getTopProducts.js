import asyncHandler from "express-async-handler";
import Product from "../../models/productModel.js";

export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isPublished: true })
    .sort({ rating: -1 })
    .limit(3);
  res.status(200).json(products);
});
