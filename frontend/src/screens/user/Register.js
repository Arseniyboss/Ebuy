import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import {
  FormContainer,
  Form,
  FormHeading,
  FormGroup,
  FormInput,
  FormButton,
  FormFooter,
  FormText,
  FormLink,
  ErrorMessage,
} from "../../styles/Form";
import Message from "../../components/message/Message";
import Meta from "../../components/Meta";
import { register } from "../../actions/user/register";
import {
  USERNAME_REQUIRED,
  USERNAME_INVALID,
  EMAIL_REQUIRED,
  EMAIL_INVALID,
  PASSWORD_REQUIRED,
  PASSWORD_INVALID,
  PASSWORDS_DIFFERENT,
} from "../../constants/validation/errors";
import {
  USERNAME_PATTERN,
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
} from "../../constants/validation/patterns";

const Register = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = {
    name: {
      required: {
        value: true,
        message: USERNAME_REQUIRED,
      },
      pattern: {
        value: USERNAME_PATTERN,
        message: USERNAME_INVALID,
      },
    },
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
    password: {
      required: {
        value: true,
        message: PASSWORD_REQUIRED,
      },
      pattern: {
        value: PASSWORD_PATTERN,
        message: PASSWORD_INVALID,
      },
    },
    confirmPassword: {
      required: {
        value: true,
        message: PASSWORD_REQUIRED,
      },
      matches: {
        value: "password",
        message: PASSWORDS_DIFFERENT,
      },
    },
  };

  const submitForm = () => {
    dispatch(register(values.name, values.email, values.password));
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

  const { success, error } = useSelector((state) => state.user.userRegister);

  const { userInfo } = useSelector((state) => state.user.userLogin);

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setDisabled(false);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      setSuccessMessage("Email verification link sent");
      setDisabled(false);
    }
  }, [success]);

  useEffect(() => {
    setErrorMessage("");
    setSuccessMessage("");
  }, [errors]);

  return (
    <>
      <Meta title="Register" />
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormHeading>Sign Up</FormHeading>
          {errorMessage && <Message variant="error">{errorMessage}</Message>}
          {successMessage && (
            <Message variant="success">{successMessage}</Message>
          )}
          <FormGroup>
            <label htmlFor="name">Name</label>
            <FormInput
              type="text"
              name="name"
              id="name"
              ref={inputRef}
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <FormInput
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password</label>
            <FormInput
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <FormInput
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
            )}
          </FormGroup>
          <FormButton disabled={disabled}>Sign Up</FormButton>
          <FormFooter>
            <FormText>Have an account?</FormText>
            <FormLink to="/login">Sign In</FormLink>
          </FormFooter>
        </Form>
      </FormContainer>
    </>
  );
};

export default Register;
