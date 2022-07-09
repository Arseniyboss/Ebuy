import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.user.userLogin);

  const { userInfo } = userLogin;

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
