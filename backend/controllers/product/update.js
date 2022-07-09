import asyncHandler from "express-async-handler";
import Product from "../../models/productModel.js";

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
