import styled from "styled-components";
import { Heading } from "../../GlobalStyle";

export const DiscountHeading = styled(Heading)`
  color: red;
`;

export const DiscountItems = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const DiscountItem = styled.p`
  font-size: 1.2rem;
  margin: 0 3px;

  @media screen and (max-width: 360px) {
    font-size: 1rem;
  }

  @media screen and (max-width: 300px) {
    font-size: 0.9rem;
  }
`;
