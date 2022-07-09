import asyncHandler from "express-async-handler";
import Product from "../../models/productModel.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort([["createdAt", -1]]);
  res.status(200).json(products);
});
