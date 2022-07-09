import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { FaUser, FaEnvelope } from "react-icons/fa";

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background: var(--primary-color);
  padding: 22px;
  margin-bottom: 1rem;
  transition: 0.2s all ease;
  position: sticky;
  top: 0;
  z-index: 999;
`;

export const NavLogo = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  font-size: 1.6rem;
  gap: 1rem;
`;

export const NavMenu = styled.div`
  display: flex;
  gap: 1.2rem;

  @media screen and (max-width: 350px) {
    gap: 0.7rem;
  }
`;

export const NavItem = styled(NavLink)`
  position: relative;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  cursor: pointer;
  transition: 0.4s all ease;

  &:hover,
  &.active {
    color: white;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ShoppingCart = styled(HiShoppingCart)`
  font-size: 1.8rem;
`;

export const Avatar = styled.div`
  --size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--size);
  width: var(--size);
  background: darkgrey;
  border-radius: 50%;
  text-transform: capitalize;
  cursor: pointer;
`;

export const Dropdown = styled.div`
  position: absolute;
  background: white;
  color: #586380;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  font-weight: bold;
  margin-top: 2.5rem;
  border-radius: 10px;
  overflow: hidden;
`;

export const AdminDropdown = styled.div`
  border-top: 1px solid #586380;
`;

export const DropdownLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

export const DropdownText = styled.p`
  padding: 0.3rem 0.6rem;
  cursor: pointer;

  &:hover {
    background: lightgrey;
    color: #303545;
  }
`;

export const User = styled(FaUser)`
  font-size: 1.5rem;
`;

export const Envelope = styled(FaEnvelope)`
  font-size: 1.8rem;
  margin-left: 5px;
`;
