import asyncHandler from "express-async-handler";
import Product from "../../models/productModel.js";

export const updateStock = asyncHandler(async (req, res) => {
  const { countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.countInStock = countInStock;

    const updatedStock = await product.save();

    res.status(200).json(updatedStock);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
