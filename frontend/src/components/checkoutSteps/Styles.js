import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.div`
  display: flex;
  justify-content: ${({ $center }) => ($center ? "center" : "space-between")};
  margin-bottom: 1rem;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: ${({ disabled }) => (disabled ? "lightgrey" : "black")};
  pointer-events: ${({ disabled }) => disabled && "none"};
  margin: ${({ $center }) => $center && "1rem"};

  @media screen and (max-width: 350px) {
    font-size: 0.8rem;
  }
`;
