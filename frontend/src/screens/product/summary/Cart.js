import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMounted } from "../../../hooks/useMounted";
import { Heading, Button } from "../../../GlobalStyle";
import {
  CartLink,
  CartItemsContainer,
  CartItems,
  ClearButtonContainer,
  ClearButton,
  CartSubtotal,
  CartSubtotalItem,
  CartSubtotalPrice,
} from "./Styles";
import CartItem from "../../../components/CartItem";
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/message/Message";
import Meta from "../../../components/Meta";
import { useDiscountContext } from "../../../contexts/DiscountContext";
import { formatPrice } from "../../../helpers/formatPrice";
import { getUserDetails } from "../../../actions/user/details";
import { clearCart } from "../../../actions/cart/clear";
import { USER_DETAILS_RESET } from "../../../constants/user/details";
import { CART_ADD_ITEM_RESET } from "../../../constants/cart/add";
import { CART_REMOVE_ITEM_RESET } from "../../../constants/cart/remove";
import { CART_UPDATE_ITEM_RESET } from "../../../constants/cart/update";
import { CLEAR_CART_RESET } from "../../../constants/cart/clear";

const Cart = () => {
  const [disabled, setDisabled] = useState(false);

  const mounted = useMounted();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user.userLogin);

  const {
    user: { cartItems = [] } = {},
    loading: loadingDetails,
    error: errorDetails,
  } = useSelector((state) => state.user.userDetails);

  const { loading: addLoading, success: addSuccess } = useSelector(
    (state) => state.cart.addToCart
  );

  const { success: removeSuccess, loading: removeLoading } = useSelector(
    (state) => state.cart.removeFromCart
  );

  const { success: clearSuccess } = useSelector(
    (state) => state.cart.clearCart
  );

  const { success: updateSuccess } = useSelector(
    (state) => state.cart.updateCartItem
  );

  const { expired } = useDiscountContext();

  useEffect(() => {
    if (
      (userInfo && !addLoading) ||
      addSuccess ||
      removeSuccess ||
      updateSuccess ||
      clearSuccess
    ) {
      if (errorDetails) return;
      dispatch(getUserDetails());
      dispatch({ type: CART_ADD_ITEM_RESET });
      dispatch({ type: CART_REMOVE_ITEM_RESET });
      dispatch({ type: CART_UPDATE_ITEM_RESET });
      dispatch({ type: CLEAR_CART_RESET });
    }
  }, [
    dispatch,
    userInfo,
    addLoading,
    removeLoading,
    addSuccess,
    removeSuccess,
    updateSuccess,
    clearSuccess,
    errorDetails,
  ]);

  // resets loading to true when the item is being added

  useEffect(() => {
    dispatch({ type: USER_DETAILS_RESET });
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch({ type: USER_DETAILS_RESET });
    };
  }, [dispatch]);

  const deleteItems = () => {
    dispatch(clearCart());
    setDisabled(true);
  };

  return (
    <>
      <Meta title="Cart" />
      <Heading>Shopping Cart</Heading>
      {userInfo && (loadingDetails || !mounted) ? (
        <Loader variant="rainbow" />
      ) : errorDetails ? (
        <Message variant="error">{errorDetails}</Message>
      ) : (
        <>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your cart is empty <CartLink to="/">Go Back</CartLink>
            </Message>
          ) : (
            <CartItemsContainer>
              <CartItems>
                {cartItems.map((item) =>
                  cartItems.length === 1 ? (
                    <CartItem key={item._id} {...item} />
                  ) : (
                    <CartItem key={item._id} {...item} underline />
                  )
                )}
                <ClearButtonContainer>
                  <ClearButton disabled={disabled} onClick={deleteItems}>
                    Clear Cart
                  </ClearButton>
                </ClearButtonContainer>
              </CartItems>
              <CartSubtotal>
                <h2>
                  {cartItems.length === 1 ? (
                    <CartSubtotalItem>
                      Subtotal (
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                      item
                    </CartSubtotalItem>
                  ) : (
                    <CartSubtotalItem>
                      Subtotal (
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                      items
                    </CartSubtotalItem>
                  )}
                </h2>
                <CartSubtotalPrice>
                  {!expired ? (
                    <CartSubtotalItem>
                      $
                      {formatPrice(
                        cartItems.reduce(
                          (acc, item) =>
                            acc + item.quantity * item.discountPrice,
                          0
                        )
                      )}
                    </CartSubtotalItem>
                  ) : (
                    <CartSubtotalItem>
                      $
                      {formatPrice(
                        cartItems.reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                      )}
                    </CartSubtotalItem>
                  )}
                </CartSubtotalPrice>
                <Link to="/shipping">
                  <div>
                    <Button>Proceed To Checkout</Button>
                  </div>
                </Link>
              </CartSubtotal>
            </CartItemsContainer>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
