import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useMounted } from "../../hooks/useMounted";
import {
  FormContainer,
  Form,
  FormHeading,
  FormGroup,
  FormInput,
  FormButton,
  ErrorMessage,
} from "../../styles/Form";
import Meta from "../../components/Meta";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import Loader from "../../components/loader/Loader";
import { addShippingAddress } from "../../actions/checkout/addShippingAddress";
import { getUserDetails } from "../../actions/user/details";
import { USER_DETAILS_RESET } from "../../constants/user/details";
import { ADD_SHIPPING_ADDRESS_RESET } from "../../constants/checkout/addShippingAddress";
import {
  ADDRESS_REQUIRED,
  ADDRESS_INVALID,
  COUNTRY_REQUIRED,
  COUNTRY_INVALID,
  CITY_REQUIRED,
  CITY_INVALID,
  POSTAL_CODE_REQUIRED,
  POSTAL_CODE_INVALID,
} from "../../constants/validation/errors";
import {
  ADDRESS_PATTERN,
  COUNTRY_PATTERN,
  CITY_PATTERN,
  POSTAL_CODE_PATTERN,
} from "../../constants/validation/patterns";

const Shipping = () => {
  const [disabled, setDisabled] = useState(false);

  const {
    loading: loadingDetails,
    user: { checkout },
  } = useSelector((state) => state.user.userDetails);

  const { loading: addAddressLoading } = useSelector(
    (state) => state.checkout.addShippingAddress
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!addAddressLoading) {
      dispatch(getUserDetails());
      dispatch({ type: ADD_SHIPPING_ADDRESS_RESET });
    }
  }, [dispatch, addAddressLoading]);

  useEffect(() => {
    return () => {
      dispatch({ type: USER_DETAILS_RESET });
    };
  }, [dispatch]);

  const initialState = {
    address: "",
    country: "",
    city: "",
    postalCode: "",
  };

  const validationSchema = {
    address: {
      required: {
        value: true,
        message: ADDRESS_REQUIRED,
      },
      pattern: {
        value: ADDRESS_PATTERN,
        message: ADDRESS_INVALID,
      },
    },
    country: {
      required: {
        value: true,
        message: COUNTRY_REQUIRED,
      },
      pattern: {
        value: COUNTRY_PATTERN,
        message: COUNTRY_INVALID,
      },
    },
    city: {
      required: {
        value: true,
        message: CITY_REQUIRED,
      },
      pattern: {
        value: CITY_PATTERN,
        message: CITY_INVALID,
      },
    },
    postalCode: {
      required: {
        value: true,
        message: POSTAL_CODE_REQUIRED,
      },
      pattern: {
        value: POSTAL_CODE_PATTERN,
        message: POSTAL_CODE_INVALID,
      },
    },
  };

  const submitForm = () => {
    dispatch(
      addShippingAddress({
        address: values.address,
        country: values.country,
        city: values.city,
        postalCode: values.postalCode,
      })
    );
    setDisabled(true);
  };

  const { values, setValues, errors, handleChange, handleSubmit } = useForm(
    initialState,
    submitForm,
    validationSchema
  );

  const [method, setMethod] = useState(false);

  const inputRef = useRef();

  const mounted = useMounted();

  useEffect(() => {
    if (!loadingDetails && mounted) {
      inputRef.current?.focus();
    }
  }, [loadingDetails, inputRef, mounted]);

  useEffect(() => {
    if (checkout?.paymentMethod) {
      setMethod(true);
    }
  }, [checkout]);

  useEffect(() => {
    if (checkout?.shippingAddress) {
      setValues({
        address: checkout.shippingAddress.address,
        country: checkout.shippingAddress.country,
        city: checkout.shippingAddress.city,
        postalCode: checkout.shippingAddress.postalCode,
      });
    }
  }, [checkout, setValues]);

  return (
    <>
      <Meta title="Shipping" />
      {loadingDetails || !mounted ? (
        <Loader variant="primary" />
      ) : (
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            {method ? (
              <CheckoutSteps step2 step3 />
            ) : checkout?.shippingAddress.address ? (
              <CheckoutSteps step2 />
            ) : (
              <CheckoutSteps />
            )}
            <FormHeading>Shipping</FormHeading>
            <FormGroup>
              <label htmlFor="address">Address</label>
              <FormInput
                type="text"
                name="address"
                id="address"
                ref={inputRef}
                value={values.address || initialState.address}
                onChange={handleChange}
              />
              {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <label>Country</label>
              <FormInput
                type="text"
                name="country"
                id="country"
                value={values.country || initialState.country}
                onChange={handleChange}
              />
              {errors.country && <ErrorMessage>{errors.country}</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <label>City</label>
              <FormInput
                type="text"
                name="city"
                id="city"
                value={values.city || initialState.city}
                onChange={handleChange}
              />
              {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <label htmlFor="postalCode">Postal Code</label>
              <FormInput
                type="text"
                name="postalCode"
                id="postalCode"
                value={values.postalCode || initialState.postalCode}
                onChange={handleChange}
              />
              {errors.postalCode && (
                <ErrorMessage>{errors.postalCode}</ErrorMessage>
              )}
            </FormGroup>
            <FormButton disabled={disabled}>Continue</FormButton>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default Shipping;
