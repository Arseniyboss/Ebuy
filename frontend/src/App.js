import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import ShippingRoute from "./routes/ShippingRoute";
import PaymentRoute from "./routes/PaymentRoute";
import GlobalStyle, { Container } from "./GlobalStyle";
import DiscountContextProvider from "./contexts/DiscountContext";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./screens/home/Home";
import Product from "./screens/product/Product";
import Cart from "./screens/product/summary/Cart";
import Contact from "./screens/user/Contact";
import Login from "./screens/user/Login";
import Register from "./screens/user/Register";
import VerifyEmail from "./screens/user/VerifyEmail";
import ForgotPassword from "./screens/user/ForgotPassword";
import ResetPassword from "./screens/user/ResetPassword";
import Profile from "./screens/user/Profile";
import UserOrders from "./screens/user/UserOrders";
import Shipping from "./screens/user/Shipping";
import Payment from "./screens/user/Payment";
import PlaceOrder from "./screens/product/summary/PlaceOrder";
import Order from "./screens/product/summary/Order/Order";
import UserList from "./screens/admin/user/UserList";
import UserEdit from "./screens/admin/user/UserEdit";
import ProductList from "./screens/admin/product/ProductList";
import ProductEdit from "./screens/admin/product/ProductEdit";
import OrderList from "./screens/admin/order/OrderList";
import ErrorScreen from "./screens/error/ErrorScreen";

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Container>
        <DiscountContextProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/product/:id" component={Product} />
            <Route path="/cart" component={Cart} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/:id/verify/:token" component={VerifyEmail} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="/resetPassword/:token" component={ResetPassword} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/orders" component={UserOrders} />
            <ShippingRoute path="/shipping" component={Shipping} />
            <PaymentRoute path="/payment" component={Payment} />
            <PaymentRoute path="/placeorder" component={PlaceOrder} />
            <ProtectedRoute path="/order/:id" component={Order} />
            <AdminRoute path="/admin/userlist" component={UserList} />
            <AdminRoute path="/admin/user/:id/edit" component={UserEdit} />
            <AdminRoute path="/admin/productlist" component={ProductList} />
            <AdminRoute
              path="/admin/product/:id/edit"
              component={ProductEdit}
            />
            <AdminRoute path="/admin/orderlist" component={OrderList} />
            <Route path="*" component={ErrorScreen} />
          </Switch>
        </DiscountContextProvider>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
