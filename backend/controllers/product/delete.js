import asyncHandler from "express-async-handler";
import Product from "../../models/productModel.js";

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.status(200).json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
