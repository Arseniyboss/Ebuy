import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FormContainer, Form, FormHeading } from "../../styles/Form.js";
import Meta from "../../components/Meta";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import { verifyEmail } from "../../actions/user/verifyEmail";

const VerifyEmail = ({ history }) => {
  const { id, token } = useParams();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user.userLogin);

  const { loading, error, success } = useSelector(
    (state) => state.user.userVerifyEmail
  );

  useEffect(() => {
    dispatch(verifyEmail(id, token));
  }, [dispatch, id, token]);

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  return (
    <>
      <Meta title="Verify Email" />
      {loading ? (
        <FormContainer>
          <Loader variant="rainbow" />
        </FormContainer>
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        success && (
          <FormContainer>
            <Form>
              <FormHeading>Email Verified</FormHeading>
              <p>
                Your email was successfully verified. Now you can login with
                your credentials
              </p>
            </Form>
          </FormContainer>
        )
      )}
    </>
  );
};

export default VerifyEmail;
