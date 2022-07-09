import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMounted } from "../../../hooks/useMounted";
import { useForm } from "../../../hooks/useForm";
import {
  FormContainer,
  Form,
  FormHeading,
  FormGroup,
  FormInput,
  FormButton,
  FormCheckbox,
  ErrorMessage,
} from "../../../styles/Form";
import Message from "../../../components/message/Message";
import Loader from "../../../components/loader/Loader";
import Meta from "../../../components/Meta";
import { getUserDetails } from "../../../actions/user/details";
import { updateUser } from "../../../actions/user/update";
import { USER_UPDATE_RESET } from "../../../constants/user/update";
import { USER_DETAILS_RESET } from "../../../constants/user/details";
import {
  USERNAME_REQUIRED,
  USERNAME_INVALID,
  EMAIL_REQUIRED,
  EMAIL_INVALID,
} from "../../../constants/validation/errors";
import {
  USERNAME_PATTERN,
  EMAIL_PATTERN,
} from "../../../constants/validation/patterns";

const UserEdit = ({ history }) => {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const mounted = useMounted();

  const initialState = {
    name: "",
    email: "",
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
  };

  const submitForm = () => {
    dispatch(
      updateUser({
        _id: userId,
        name: values.name,
        email: values.email,
        isAdmin,
      })
    );
    setDisabled(true);
  };

  const { values, setValues, errors, handleChange, handleSubmit } = useForm(
    initialState,
    submitForm,
    validationSchema
  );

  const { id: userId } = useParams();

  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user.userLogin);

  const {
    loading: loadingDetails,
    error: errorDetails,
    user,
  } = useSelector((state) => state.user.userDetails);

  const { error, success } = useSelector((state) => state.user.userUpdate);

  useEffect(() => {
    if (error) {
      setMessage(error);
      setDisabled(false);
    }
  }, [error]);

  useEffect(() => {
    setMessage("");
  }, [errors]);

  useEffect(() => {
    if (errorDetails) return;
    if (success) {
      history.push("/admin/userlist");
      return;
    }
    if (!user.name) {
      dispatch(getUserDetails(userId));
      return;
    }
    setValues({
      name: user.name,
      email: user.email,
    });
    setIsAdmin(user.isAdmin);
  }, [errorDetails, success, user, userId, dispatch, history, setValues]);

  useEffect(() => {
    return () => {
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: USER_UPDATE_RESET });
    };
  }, [dispatch]);

  return (
    <>
      <Meta title="User Edit" />
      {errorDetails ? (
        <Message variant="error">{errorDetails}</Message>
      ) : (
        <FormContainer>
          {loadingDetails || !mounted ? (
            <Loader variant="rainbow" />
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormHeading>Edit User</FormHeading>
              {message && <Message variant="error">{message}</Message>}
              <FormGroup>
                <label htmlFor="name">Name</label>
                <FormInput
                  type="name"
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
              <div>
                {(user && !user.isAdmin) || userInfo._id !== user._id ? (
                  <>
                    <FormCheckbox
                      type="checkbox"
                      name="isAdmin"
                      id="isAdmin"
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                    <label htmlFor="isAdmin">Is Admin</label>
                  </>
                ) : (
                  <>
                    <FormCheckbox type="checkbox" checked={isAdmin} readOnly />
                    <label>Is Admin</label>
                  </>
                )}
              </div>
              <FormButton disabled={disabled}>Update</FormButton>
            </Form>
          )}
        </FormContainer>
      )}
    </>
  );
};

export default UserEdit;
