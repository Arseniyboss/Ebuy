import asyncHandler from "express-async-handler";
import Product from "../../models/productModel.js";

export const getPublishedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isPublished: true }).sort([
    ["createdAt", -1],
  ]);
  res.status(200).json(products);
});
