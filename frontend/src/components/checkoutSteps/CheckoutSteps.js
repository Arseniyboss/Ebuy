import { Nav, NavLink } from "./Styles";

const CheckoutSteps = ({ step2, step3, center }) => {
  return (
    <Nav $center={center}>
      <NavLink to="/shipping" $center={center}>
        Shipping
      </NavLink>
      {step2 ? (
        <NavLink to="/payment" $center={center}>
          Payment
        </NavLink>
      ) : (
        <NavLink to="/payment" disabled>
          Payment
        </NavLink>
      )}
      {step3 ? (
        <NavLink to="/placeorder" $center={center}>
          Place Order
        </NavLink>
      ) : (
        <NavLink to="/placeorder" disabled>
          Place Order
        </NavLink>
      )}
    </Nav>
  );
};

export default CheckoutSteps;
