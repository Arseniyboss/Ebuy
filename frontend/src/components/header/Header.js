import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  NavLogo,
  NavMenu,
  NavItem,
  UserContainer,
  ShoppingCart,
  Avatar,
  Dropdown,
  AdminDropdown,
  DropdownLink,
  DropdownText,
  User,
  Envelope,
} from "./Styles";
import { logout } from "../../actions/user/logout";
import { deleteUser } from "../../actions/user/delete";
import { SiShopify } from "react-icons/si";

const Header = () => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const { userInfo } = useSelector((state) => state.user.userLogin);

  const { success, error } = useSelector((state) => state.user.userDelete);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(userInfo._id));
    }
  };

  useEffect(() => {
    if (success) {
      dispatch(logout());
    }
    if (error) {
      alert(error);
    }
  }, [dispatch, success, error]);

  return (
    <Navbar>
      <NavLogo to="/">
        <SiShopify />
        <p>Ebuy</p>
      </NavLogo>
      <NavMenu>
        <NavItem to="/cart" aria-label="shopping cart">
          <ShoppingCart />
        </NavItem>
        {userInfo ? (
          <UserContainer>
            <Avatar onClick={toggleDropdown}>{userInfo.name[0]}</Avatar>
            {dropdown && (
              <Dropdown onClick={toggleDropdown} admin={userInfo.isAdmin}>
                <DropdownLink to="/profile">
                  <DropdownText>Profile</DropdownText>
                </DropdownLink>
                <DropdownLink to="/orders">
                  <DropdownText>Orders</DropdownText>
                </DropdownLink>
                <DropdownText onClick={handleLogout}>Logout</DropdownText>
                {!userInfo.isAdmin && (
                  <DropdownText onClick={handleDelete}>Delete</DropdownText>
                )}
                {userInfo.isAdmin && (
                  <AdminDropdown>
                    <DropdownLink to="/admin/userlist">
                      <DropdownText>Users</DropdownText>
                    </DropdownLink>
                    <DropdownLink to="/admin/productlist">
                      <DropdownText>Products</DropdownText>
                    </DropdownLink>
                    <DropdownLink to="/admin/orderlist">
                      <DropdownText>Orders</DropdownText>
                    </DropdownLink>
                  </AdminDropdown>
                )}
              </Dropdown>
            )}
          </UserContainer>
        ) : (
          <NavItem to="/login" aria-label="user">
            <User />
          </NavItem>
        )}
        <NavItem to="/contact" aria-label="envelope">
          <Envelope />
        </NavItem>
      </NavMenu>
    </Navbar>
  );
};

export default Header;
