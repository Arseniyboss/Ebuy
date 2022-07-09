import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reviewSchema = Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Sample name",
      trim: true,
    },
    image: {
      type: String,
      required: true,
      default: "/images/sample.jpg",
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      default: "Sample brand",
      trim: true,
    },
    category: {
      type: String,
      required: true,
      default: "Sample category",
      trim: true,
    },
    description: {
      type: String,
      required: true,
      default: "Sample description",
      trim: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 99.99,
    },
    discountPrice: {
      type: Number,
      required: true,
      default: 49.99,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 1,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

export default Product;
