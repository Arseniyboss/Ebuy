import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";

const ShippingRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();

  const { userInfo } = useSelector((state) => state.user.userLogin);

  const { user: { cartItems = [] } = {}, loading: loadingDetails } =
    useSelector((state) => state.user.userDetails);

  const { loading: addAddressLoading, success: addAddressSuccess } =
    useSelector((state) => state.checkout.addShippingAddress);

  useEffect(() => {
    if (!addAddressLoading && addAddressSuccess) {
      history.push("/payment");
    }
  }, [history, addAddressLoading, addAddressSuccess]);

  const shippingRoute = (props) => {
    if (!loadingDetails && cartItems.length === 0) {
      return <Redirect to="/cart" />;
    }
    return <Component {...props} />;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? shippingRoute(props) : <Redirect to="/login" />
      }
    />
  );
};

export default ShippingRoute;
