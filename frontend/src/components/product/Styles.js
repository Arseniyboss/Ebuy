import styled from "styled-components";
import { Link } from "react-router-dom";

export const ProductContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const ProductLink = styled(Link)`
  text-decoration: none;
`;

export const ProductFooter = styled.div`
  padding: 1rem 20px;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 195px;
  /* use if all images are the same size initially */
  /* height: 100%; */
  border-radius: 4px 4px 0 0;

  @media screen and (max-width: 900px) {
    height: 250px;
  }

  @media screen and (max-width: 740px) {
    height: 300px;
  }

  @media screen and (max-width: 559px) {
    height: 270px;
  }

  @media screen and (max-width: 380px) {
    height: 230px;
  }
`;

export const ProductName = styled.div`
  color: var(--primary-color);
`;

export const ProductRating = styled.div`
  margin: 1rem 0;
`;

export const ProductPrice = styled.h2`
  letter-spacing: 2px;
  text-decoration: ${({ discount }) => discount && "line-through"};
  text-decoration-color: ${({ discount }) => discount && "red"};
  display: inline;
  margin-right: 0.6rem;
  font-size: 1.3rem;
`;
