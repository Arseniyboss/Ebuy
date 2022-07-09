import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm.js";
import {
  FormContainer,
  Form,
  FormHeading,
  FormGroup,
  FormInput,
  FormButton,
  ErrorMessage,
} from "../../styles/Form.js";
import Meta from "../../components/Meta";
import Message from "../../components/message/Message";
import { forgotPassword } from "../../actions/user/forgotPassword";
import {
  EMAIL_REQUIRED,
  EMAIL_INVALID,
} from "../../constants/validation/errors.js";
import { EMAIL_PATTERN } from "../../constants/validation/patterns.js";

const ForgotPassword = ({ history }) => {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const initialState = {
    email: "",
  };

  const validationSchema = {
    email: {
      required: {
        value: true,
        message: EMAIL_REQUIRED,
      },
      pattern: {
        value: EMAIL_PATTERN,
        message: EMAIL_INVALID,
      },
    },
  };

  const submitForm = () => {
    dispatch(forgotPassword(values.email));
    setDisabled(true);
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialState,
    submitForm,
    validationSchema
  );

  const dispatch = useDispatch();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const { userInfo } = useSelector((state) => state.user.userLogin);

  const { error, success } = useSelector(
    (state) => state.user.userForgotPassword
  );

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  useEffect(() => {
    if (error) {
      setMessage(error);
      setDisabled(false);
    }
  }, [error]);

  useEffect(() => {
    setMessage("");
  }, [errors]);

  return (
    <>
      <Meta title="Forgot Password" />
      <FormContainer>
        {success ? (
          <Form>
            <FormHeading>Email Sent</FormHeading>
            <p>
              An email with instructions on how to reset your password has been
              sent to <b>{values.email}</b>
            </p>
          </Form>
        ) : (
          <Form onSubmit={handleSubmit}>
            <FormHeading>Forgot Password</FormHeading>
            {message && <Message variant="error">{message}</Message>}
            <FormGroup>
              <label htmlFor="email">Email</label>
              <FormInput
                type="email"
                name="email"
                id="email"
                ref={inputRef}
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>
            <FormButton disabled={disabled}>Continue</FormButton>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ForgotPassword;
