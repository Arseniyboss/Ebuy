import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
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
import { resetPassword } from "../../actions/user/resetPassword";
import {
  PASSWORD_REQUIRED,
  PASSWORD_INVALID,
  PASSWORDS_DIFFERENT,
} from "../../constants/validation/errors";
import { PASSWORD_PATTERN } from "../../constants/validation/patterns";

const ResetPassword = ({ history }) => {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const { token } = useParams();

  const initialState = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = {
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
    dispatch(resetPassword(values.password, token));
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
    (state) => state.user.userResetPassword
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
      <Meta title="Reset Password" />
      <FormContainer>
        {success ? (
          <Form>
            <FormHeading>Password Changed</FormHeading>
            <p>
              Your password was successfully changed. Now you can login with
              your new password
            </p>
          </Form>
        ) : (
          <Form onSubmit={handleSubmit}>
            <FormHeading>Reset Password</FormHeading>
            {message && <Message variant="error">{message}</Message>}
            <FormGroup>
              <label htmlFor="password">Password</label>
              <FormInput
                type="password"
                name="password"
                id="password"
                ref={inputRef}
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && (
                <ErrorMessage>{errors.password}</ErrorMessage>
              )}
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
            <FormButton disabled={disabled}>Reset</FormButton>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ResetPassword;
