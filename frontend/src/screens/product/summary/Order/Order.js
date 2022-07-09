import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderScreen from "./OrderScreen";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

const Order = () => {
  return (
    <Elements stripe={getStripe()}>
      <OrderScreen />
    </Elements>
  );
};

export default Order;
