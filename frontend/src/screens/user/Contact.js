import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMounted } from "../../hooks/useMounted";
import { useForm } from "../../hooks/useForm";
import {
  FormContainer,
  Form,
  FormHeading,
  FormGroup,
  FormInput,
  TextArea,
  FormButton,
  ErrorMessage,
} from "../../styles/Form";
import Meta from "../../components/Meta";
import Modal from "../../components/modal/Modal";
import Loader from "../../components/loader/Loader";
import { getUserDetails } from "../../actions/user/details";
import { USER_DETAILS_RESET } from "../../constants/user/details";
import {
  USERNAME_REQUIRED,
  USERNAME_INVALID,
  EMAIL_REQUIRED,
  EMAIL_INVALID,
  MESSAGE_REQUIRED,
} from "../../constants/validation/errors";
import {
  USERNAME_PATTERN,
  EMAIL_PATTERN,
} from "../../constants/validation/patterns";

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const initialState = {
    name: "",
    email: "",
    message: "",
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
    message: {
      required: {
        value: true,
        message: MESSAGE_REQUIRED,
      },
    },
  };

  const submitForm = () => {
    axios.post("https://formspree.io/f/xwkylwdy", values);
    setValues(initialState);
    setSuccess(true);
    setDisabled(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const { values, setValues, errors, handleChange, handleSubmit } = useForm(
    initialState,
    submitForm,
    validationSchema
  );

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const { userInfo } = useSelector((state) => state.user.userLogin);

  const { user, loading, error } = useSelector(
    (state) => state.user.userDetails
  );

  const dispatch = useDispatch();

  const mounted = useMounted();

  useEffect(() => {
    if (!userInfo) return;
    if (error) return;
    if (!user.name) {
      dispatch(getUserDetails());
      return;
    }
    setValues({
      name: user.name,
      email: user.email,
    });
  }, [user, dispatch, setValues, userInfo, error]);

  useEffect(() => {
    if (success) {
      setDisabled(false);
    }
  }, [success]);

  useEffect(() => {
    return () => {
      dispatch({ type: USER_DETAILS_RESET });
    };
  }, [dispatch]);

  return (
    <>
      <Meta title="Contact" />
      {userInfo && (loading || !mounted) ? (
        <Loader variant="primary" />
      ) : (
        <>
          {success && <Modal setSuccess={setSuccess} />}
          <FormContainer>
            <Form onSubmit={handleSubmit}>
              <FormHeading>Contact Us</FormHeading>
              <FormGroup>
                <label htmlFor="name">Name</label>
                <FormInput
                  type="name"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  ref={inputRef}
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
                <label htmlFor="message">Message</label>
                <TextArea
                  name="message"
                  id="message"
                  as="textarea"
                  rows={5}
                  value={values.message}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                ></TextArea>
                {errors.message && (
                  <ErrorMessage>{errors.message}</ErrorMessage>
                )}
              </FormGroup>
              <FormButton disabled={disabled}>Submit</FormButton>
            </Form>
          </FormContainer>
        </>
      )}
    </>
  );
};

export default Contact;
