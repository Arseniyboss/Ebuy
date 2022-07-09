import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PaymentRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = useSelector((state) => state.user.userLogin);

  const {
    user: {
      cartItems = [],
      checkout = { shippingAddress: {}, paymentMethod: "" },
    } = {},
    loading: loadingDetails,
  } = useSelector((state) => state.user.userDetails);

  const { shippingAddress } = checkout;

  const paymentRoute = (props) => {
    if (!loadingDetails && !shippingAddress.address) {
      return <Redirect to="/shipping" />;
    }
    if (!loadingDetails && cartItems.length === 0) {
      return <Redirect to="/cart" />;
    }
    return <Component {...props} />;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? paymentRoute(props) : <Redirect to="/login" />
      }
    />
  );
};

export default PaymentRoute;
