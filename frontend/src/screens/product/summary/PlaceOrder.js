import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMounted } from "../../../hooks/useMounted";
import { useDiscountContext } from "../../../contexts/DiscountContext";
import { Button } from "../../../GlobalStyle";
import {
  PlaceOrderHeader,
  PlaceOrderHeading,
  PlaceOrderItem,
  CartItemsContainer,
  CartItems,
  CartSubtotal,
  CartSubtotalItem,
  CartSubtotalText,
  CartSubtotalPrice,
} from "./Styles";
import OrderItem from "../../../components/OrderItem";
import CheckoutSteps from "../../../components/checkoutSteps/CheckoutSteps";
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/message/Message";
import Meta from "../../../components/Meta";
import { createOrder } from "../../../actions/order/create";
import { adjustStock } from "../../../helpers/adjustStock";
import { formatPrice } from "../../../helpers/formatPrice";
import { getUserDetails } from "../../../actions/user/details";
import { clearCart } from "../../../actions/cart/clear";
import { listProducts } from "../../../actions/product/list";
import { PRODUCT_LIST_RESET } from "../../../constants/product/list";
import { UPDATE_PAYMENT_METHOD_RESET } from "../../../constants/checkout/updatePaymentMethod";
import { USER_DETAILS_RESET } from "../../../constants/user/details";

const PlaceOrder = ({ history }) => {
  const [disabled, setDisabled] = useState(false);

  const mounted = useMounted();

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product.productList);

  const {
    user: {
      cartItems = [],
      checkout = { shippingAddress: {}, paymentMethod: "" },
    },
    loading: loadingDetails,
  } = useSelector((state) => state.user.userDetails);

  const { shippingAddress, paymentMethod } = checkout;

  const { order, success, error } = useSelector(
    (state) => state.order.orderCreate
  );

  useEffect(() => {
    dispatch(listProducts());
    return () => {
      dispatch({ type: PRODUCT_LIST_RESET });
    };
  }, [dispatch]);

  const { expired } = useDiscountContext();

  const { loading: addPaymentMethodLoading } = useSelector(
    (state) => state.checkout.updatePaymentMethod
  );

  useEffect(() => {
    if (!addPaymentMethodLoading) {
      dispatch(getUserDetails());
      dispatch({ type: UPDATE_PAYMENT_METHOD_RESET });
    }
  }, [dispatch, addPaymentMethodLoading]);

  useEffect(() => {
    return () => {
      dispatch({ type: USER_DETAILS_RESET });
    };
  }, [dispatch]);

  const orderSummary = {
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  };

  if (cartItems) {
    if (!expired) {
      orderSummary.itemsPrice = formatPrice(
        cartItems.reduce(
          (acc, item) => acc + item.discountPrice * item.quantity,
          0
        )
      );
    } else {
      orderSummary.itemsPrice = formatPrice(
        cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      );
    }
  }

  orderSummary.shippingPrice = formatPrice(
    orderSummary.itemsPrice > 100 ? 0 : 20
  );

  orderSummary.taxPrice = formatPrice(0.15 * orderSummary.itemsPrice);

  orderSummary.totalPrice = formatPrice(
    orderSummary.itemsPrice + orderSummary.shippingPrice + orderSummary.taxPrice
  );

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [dispatch, success, history, order]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: orderSummary.itemsPrice,
        shippingPrice: orderSummary.shippingPrice,
        taxPrice: orderSummary.taxPrice,
        totalPrice: orderSummary.totalPrice,
      })
    );
    adjustStock(dispatch, cartItems, products);
    dispatch(clearCart());
    setDisabled(true);
  };

  return (
    <>
      {error && <Message variant="error">{error}</Message>}
      <Meta title="Place Order" />
      {loadingDetails || !mounted ? (
        <Loader variant="primary" />
      ) : (
        <>
          <CheckoutSteps step2 step3 center={true} />
          <CartItemsContainer>
            <CartItems>
              <PlaceOrderHeader>
                <PlaceOrderHeading>Shipping</PlaceOrderHeading>
                <PlaceOrderItem>
                  Address: {shippingAddress.address}
                </PlaceOrderItem>
                <PlaceOrderItem>
                  Country: {shippingAddress.country}
                </PlaceOrderItem>
                <PlaceOrderItem>City: {shippingAddress.city}</PlaceOrderItem>
                <PlaceOrderItem>
                  Postal Code: {shippingAddress.postalCode}
                </PlaceOrderItem>
                <PlaceOrderHeading>Payment Method</PlaceOrderHeading>
                <PlaceOrderItem>Method: {paymentMethod}</PlaceOrderItem>
                <PlaceOrderHeading>Order Items</PlaceOrderHeading>
              </PlaceOrderHeader>
              {cartItems.map((item, index) =>
                cartItems.length === 1 ? (
                  <OrderItem key={index} {...item} />
                ) : (
                  <OrderItem key={index} {...item} underline />
                )
              )}
            </CartItems>
            <CartSubtotal>
              <CartSubtotalItem>
                <h2>Order Summary</h2>
              </CartSubtotalItem>
              <CartSubtotalItem>
                <CartSubtotalText>Items</CartSubtotalText>
                <CartSubtotalPrice>
                  ${orderSummary.itemsPrice}
                </CartSubtotalPrice>
              </CartSubtotalItem>
              <CartSubtotalItem>
                <CartSubtotalText>Shipping</CartSubtotalText>
                <CartSubtotalPrice>
                  ${orderSummary.shippingPrice}
                </CartSubtotalPrice>
              </CartSubtotalItem>
              <CartSubtotalItem>
                <CartSubtotalText>Tax</CartSubtotalText>
                <CartSubtotalPrice>${orderSummary.taxPrice}</CartSubtotalPrice>
              </CartSubtotalItem>
              <CartSubtotalItem>
                <CartSubtotalText>Total</CartSubtotalText>
                <CartSubtotalPrice>
                  ${orderSummary.totalPrice}
                </CartSubtotalPrice>
              </CartSubtotalItem>
              <Button disabled={disabled} onClick={placeOrder}>
                Place Order
              </Button>
            </CartSubtotal>
          </CartItemsContainer>
        </>
      )}
    </>
  );
};

export default PlaceOrder;
