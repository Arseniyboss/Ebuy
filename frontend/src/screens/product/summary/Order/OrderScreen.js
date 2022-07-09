import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { addPayPalScript } from "../../../../helpers/addPayPalScript";
import { PayPalButton } from "react-paypal-button-v2";
import { Button } from "../../../../GlobalStyle";
import { ErrorMessage } from "../../../../styles/Form";
import { cardStyles } from "../../../../styles/Stripe";
import {
  PlaceOrderHeader,
  OrderId,
  PlaceOrderHeading,
  PlaceOrderItem,
  CartItemsContainer,
  CartItems,
  CartSubtotal,
  CartSubtotalItem,
  CartSubtotalText,
  CartSubtotalPrice,
  CardContainer,
  FormButton,
} from "../Styles";
import OrderItem from "../../../../components/OrderItem";
import { UserEmail } from "../../../../styles/Table";
import Message from "../../../../components/message/Message";
import Meta from "../../../../components/Meta";
import Loader from "../../../../components/loader/Loader";
import { getOrderDetails } from "../../../../actions/order/details";
import { payOrder } from "../../../../actions/order/pay";
import { deliverOrder } from "../../../../actions/order/deliver";
import { ORDER_DETAILS_RESET } from "../../../../constants/order/details";
import { ORDER_PAY_RESET } from "../../../../constants/order/pay";
import { ORDER_DELIVER_RESET } from "../../../../constants/order/deliver";
import { ORDER_CREATE_RESET } from "../../../../constants/order/create";
import { CLEAR_CART_RESET } from "../../../../constants/cart/clear";
import { convertToCents } from "../../../../helpers/convertToCents";

const Order = () => {
  const [stripeError, setStripeError] = useState(null);
  const [stripeProcessing, setStripeProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const [isDelivered, setIsDelivered] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);

  const { id: orderId } = useParams();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user.userLogin);

  const { order, loading, error } = useSelector(
    (state) => state.order.orderDetails
  );

  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.order.orderPay
  );

  const { loading: loadingDeliver, success: successDeliver } = useSelector(
    (state) => state.order.orderDeliver
  );

  const { success: clearSuccess } = useSelector(
    (state) => state.cart.clearCart
  );

  useEffect(() => {
    if (clearSuccess) {
      dispatch({ type: CLEAR_CART_RESET });
    }
  }, [dispatch, clearSuccess]);

  const createPaymentIntent = useCallback(async () => {
    try {
      const { data } = await axios.post("/api/config/stripe", {
        price: convertToCents(order.totalPrice),
      });
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.log(error.response);
    }
  }, [order]);

  useEffect(() => {
    if (error) return;
    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (order.paymentMethod === "PayPal") {
        if (!window.paypal) {
          addPayPalScript(setSdkReady);
        } else {
          setSdkReady(true);
        }
      }
      if (order.paymentMethod === "Stripe") {
        createPaymentIntent();
      }
    }
  }, [
    dispatch,
    createPaymentIntent,
    error,
    order,
    orderId,
    successPay,
    successDeliver,
  ]);

  useEffect(() => {
    return () => {
      dispatch({ type: ORDER_DETAILS_RESET });
    };
  }, [dispatch]);

  const handlePay = () => {
    dispatch(payOrder(orderId));
  };

  const handleDeliver = () => {
    dispatch(deliverOrder(order));
    setIsDelivered(true);
  };

  const handleStripe = async (e) => {
    if (disabled) return;

    e.preventDefault();
    setStripeProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setStripeError(payload.error.message);
      setStripeProcessing(false);
    } else {
      setStripeError(null);
      setStripeProcessing(false);
      handlePay();
    }
  };

  return loading ? (
    <Loader variant="rainbow" />
  ) : error ? (
    <Message variant="error">{error}</Message>
  ) : (
    <CartItemsContainer>
      <Meta title="Order" />
      <CartItems>
        <PlaceOrderHeader>
          <OrderId>Order {order._id}</OrderId>
          <PlaceOrderHeading>Shipping</PlaceOrderHeading>
          <PlaceOrderItem>
            Name: {order.user ? order.user.name : "Anonymous"}
          </PlaceOrderItem>
          {userInfo?.isAdmin ? (
            <UserEmail href={order.user && `mailto:${order.user.email}`}>
              Email: {order.user ? order.user.email : "anonymous@example.com"}
            </UserEmail>
          ) : (
            <PlaceOrderItem>
              Email: {order.user ? order.user.email : "anonymous@example.com"}
            </PlaceOrderItem>
          )}
          <PlaceOrderItem>
            Address: {order.shippingAddress.address}
          </PlaceOrderItem>
          <PlaceOrderItem>
            Country: {order.shippingAddress.country}
          </PlaceOrderItem>
          <PlaceOrderItem>City: {order.shippingAddress.city}</PlaceOrderItem>
          <PlaceOrderItem>
            Postal Code: {order.shippingAddress.postalCode}
          </PlaceOrderItem>
          {order.isDelivered ? (
            <Message variant="success">
              Delivered on {order.deliveredAt}
            </Message>
          ) : (
            <Message variant="error">Not Delivered</Message>
          )}
          <PlaceOrderHeading>Payment Method</PlaceOrderHeading>
          <PlaceOrderItem>Method: {order.paymentMethod}</PlaceOrderItem>
          {order.isPaid ? (
            <Message variant="success">Paid on {order.paidAt}</Message>
          ) : (
            <Message variant="error">Not Paid</Message>
          )}
          <PlaceOrderHeading>Order Items</PlaceOrderHeading>
        </PlaceOrderHeader>
        {order.orderItems.map((item, index) =>
          order.orderItems.length === 1 ? (
            <OrderItem isPlacedOrder key={index} {...item} />
          ) : (
            <OrderItem isPlacedOrder key={index} {...item} underline />
          )
        )}
      </CartItems>
      <CartSubtotal>
        <CartSubtotalItem>
          <h2>Order Summary</h2>
        </CartSubtotalItem>
        <CartSubtotalItem>
          <CartSubtotalText>Items</CartSubtotalText>
          <CartSubtotalPrice>${order.itemsPrice}</CartSubtotalPrice>
        </CartSubtotalItem>
        <CartSubtotalItem>
          <CartSubtotalText>Shipping</CartSubtotalText>
          <CartSubtotalPrice>${order.shippingPrice}</CartSubtotalPrice>
        </CartSubtotalItem>
        <CartSubtotalItem>
          <CartSubtotalText>Tax</CartSubtotalText>
          <CartSubtotalPrice>${order.taxPrice}</CartSubtotalPrice>
        </CartSubtotalItem>
        <CartSubtotalItem>
          <CartSubtotalText>Total</CartSubtotalText>
          <CartSubtotalPrice>${order.totalPrice}</CartSubtotalPrice>
        </CartSubtotalItem>
        {error && <Message variant="error">{error}</Message>}
        {userInfo && !userInfo.isAdmin && !order.isPaid && (
          <CartSubtotalItem>
            {loadingPay && <Loader variant="stripe" />}
            {order.paymentMethod === "PayPal" &&
              (!sdkReady ? (
                <Loader variant="stripe" />
              ) : (
                <PayPalButton amount={order.totalPrice} onSuccess={handlePay} />
              ))}
            {!loadingPay && order.paymentMethod === "Stripe" && (
              <form onSubmit={handleStripe}>
                <CardContainer>
                  <CardElement
                    options={cardStyles}
                    onChange={(e) => setDisabled(e.empty)}
                  />
                </CardContainer>
                {stripeError && (
                  <ErrorMessage>{stripeError.replace(".", "")}</ErrorMessage>
                )}
                <FormButton disabled={disabled || stripeProcessing}>
                  Pay
                </FormButton>
              </form>
            )}
          </CartSubtotalItem>
        )}
        {loadingDeliver && <Loader variant="primary" />}
        {userInfo?.isAdmin &&
          order.isPaid &&
          !order.isDelivered &&
          !isDelivered && (
            <Button onClick={handleDeliver}>Mark As Delivered</Button>
          )}
      </CartSubtotal>
    </CartItemsContainer>
  );
};

export default Order;
