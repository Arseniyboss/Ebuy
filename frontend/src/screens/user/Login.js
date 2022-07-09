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
import { login } from "../../actions/user/login";
import {
  EMAIL_REQUIRED,
  PASSWORD_REQUIRED,
} from "../../constants/validation/errors";

const Login = ({ history }) => {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const initialState = {
    email: "",
    password: "",
  };

  const validationSchema = {
    email: {
      required: {
        value: true,
        message: EMAIL_REQUIRED,
      },
    },
    password: {
      required: {
        value: true,
        message: PASSWORD_REQUIRED,
      },
    },
  };

  const submitForm = () => {
    dispatch(login(values.email, values.password));
    setDisabled(true);
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialState,
    submitForm,
    validationSchema
  );

  const dispatch = useDispatch();

  const { error, userInfo } = useSelector((state) => state.user.userLogin);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

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
      <Meta title="Login" />
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormHeading>Sign In</FormHeading>
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
            <FormLink to="/forgotPassword">Forgot Password?</FormLink>
          </FormGroup>
          <FormButton disabled={disabled}>Sign In</FormButton>
          <FormFooter>
            <FormText>Don't have an account?</FormText>
            <FormLink to="/register">Sign Up</FormLink>
          </FormFooter>
        </Form>
      </FormContainer>
    </>
  );
};

export default Login;
