import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handleStripe = asyncHandler(async (req, res) => {
  const { price } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "usd",
  });

  if (!paymentIntent) {
    res.status(500);
    throw new Error("Stripe charge unsuccessful");
  }

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
