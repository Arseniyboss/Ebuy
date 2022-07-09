import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useTimeout } from "../../hooks/useTimeout";
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
import { getUserDetails } from "../../actions/user/details";
import { updateUserProfile } from "../../actions/user/updateProfile";
import Message from "../../components/message/Message";
import Loader from "../../components/loader/Loader";
import Meta from "../../components/Meta";
import { USER_DETAILS_RESET } from "../../constants/user/details";
import {
  USERNAME_REQUIRED,
  USERNAME_INVALID,
  EMAIL_REQUIRED,
  EMAIL_INVALID,
  PASSWORD_INVALID,
} from "../../constants/validation/errors";
import {
  USERNAME_PATTERN,
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
} from "../../constants/validation/patterns";

const Profile = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const mounted = useMounted();

  const initialState = {
    name: "",
    email: "",
    password: "",
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
      pattern: {
        value: PASSWORD_PATTERN,
        message: PASSWORD_INVALID,
      },
    },
  };

  const submitForm = () => {
    dispatch(
      updateUserProfile({
        id: user._id,
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
    setDisabled(true);
  };

  const { values, setValues, errors, handleChange, handleSubmit } = useForm(
    initialState,
    submitForm,
    validationSchema
  );

  const dispatch = useDispatch();

  const { user, loading, error } = useSelector(
    (state) => state.user.userDetails
  );

  const { error: errorUpdate, success: successUpdate } = useSelector(
    (state) => state.user.userUpdateProfile
  );

  useEffect(() => {
    setDisabled(false);
    if (error) return;
    if (!user.name) {
      dispatch(getUserDetails());
    }
    setValues({
      name: user.name,
      email: user.email,
    });
  }, [error, user, dispatch, setValues]);

  useEffect(() => {
    dispatch({ type: USER_DETAILS_RESET });
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch({ type: USER_DETAILS_RESET });
    };
  }, [dispatch]);

  useEffect(() => {
    if (errorUpdate) {
      setErrorMessage(errorUpdate);
      setDisabled(false);
    }
  }, [errorUpdate]);

  useEffect(() => {
    if (successUpdate) {
      setSuccessMessage("Profile Updated");
      setDisabled(false);
    }
  }, [successUpdate]);

  useTimeout(
    () => {
      if (successUpdate) {
        setSuccessMessage("");
      }
    },
    3000,
    [successUpdate]
  );

  useEffect(() => {
    setErrorMessage("");
    setSuccessMessage("");
  }, [errors]);

  return (
    <>
      <Meta title="Profile" />
      {loading || !mounted ? (
        <FormContainer>
          <Loader variant="rainbow" />
        </FormContainer>
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <FormHeading>User Profile</FormHeading>
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
                value={values.name || initialState.name}
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
                value={values.email || initialState.email}
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
                value={values.password || initialState.password}
                onChange={handleChange}
              />
              {errors.password && (
                <ErrorMessage>{errors.password}</ErrorMessage>
              )}
            </FormGroup>
            <FormButton disabled={disabled}>Update</FormButton>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default Profile;
