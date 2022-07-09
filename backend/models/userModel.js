import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema, model } = mongoose;

const cartSchema = Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    countInStock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const checkoutSchema = Schema(
  {
    shippingAddress: {
      address: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      postalCode: { type: String, required: true, trim: true },
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "PayPal",
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailVerificationToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    cartItems: [cartSchema],
    checkout: checkoutSchema,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

const User = model("User", userSchema);

export default User;
