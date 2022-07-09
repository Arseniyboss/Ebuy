import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMounted } from "../../hooks/useMounted";
import {
  FormContainer,
  Form,
  FormHeading,
  FormGroup,
  FormRadio,
  FormButton,
} from "../../styles/Form";
import Meta from "../../components/Meta";
import Loader from "../../components/loader/Loader";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import { updatePaymentMethod } from "../../actions/checkout/updatePaymentMethod";
import { getUserDetails } from "../../actions/user/details";
import { USER_DETAILS_RESET } from "../../constants/user/details";

const Payment = ({ history }) => {
  const [disabled, setDisabled] = useState(false);

  const {
    loading: loadingDetails,
    user: { checkout = { shippingAddress: {}, paymentMethod: "" } },
  } = useSelector((state) => state.user.userDetails);

  const { paymentMethod: initialMethod } = checkout;

  const [method, setMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(initialMethod);

  const mounted = useMounted();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails());
    return () => {
      dispatch({ type: USER_DETAILS_RESET });
    };
  }, [dispatch]);

  useEffect(() => {
    if (checkout?.paymentMethod) {
      setMethod(true);
    }
  }, [checkout, method, paymentMethod]);

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePaymentMethod({ paymentMethod }));
    history.push("/placeorder");
    setDisabled(true);
  };

  useEffect(() => {
    if (checkout?.paymentMethod) {
      setPaymentMethod(checkout.paymentMethod);
    }
  }, [checkout]);

  return (
    <>
      <Meta title="Payment" />
      <FormContainer>
        {loadingDetails || !mounted ? (
          <Loader variant="primary" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <CheckoutSteps step2 step3 />
            <FormHeading>Payment Method</FormHeading>
            <label>Select Method</label>
            <FormGroup>
              <FormRadio
                type="radio"
                name="paymentMethod"
                id="paypal"
                value="PayPal"
                onChange={handleChange}
                checked={paymentMethod === "PayPal"}
              />
              <label htmlFor="paypal">PayPal</label>
            </FormGroup>
            <FormGroup>
              <FormRadio
                type="radio"
                name="paymentMethod"
                id="stripe"
                value="Stripe"
                onChange={handleChange}
                checked={paymentMethod === "Stripe"}
              />
              <label htmlFor="stripe">Stripe</label>
            </FormGroup>
            <FormButton disabled={disabled}>Continue</FormButton>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default Payment;
