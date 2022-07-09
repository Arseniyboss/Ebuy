import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "../../GlobalStyle";

export const ProductContainer = styled.div`
  color: grey;
  display: grid;
  margin: 4rem auto;
  max-width: 1000px;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 1030px) {
    max-width: 780px;
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: none;
    justify-items: center;
  }

  @media screen and (min-height: 1366px) and (max-width: 1024px) {
    grid-template-columns: none;
  }
`;

export const ReturnButton = styled(Link)`
  display: inline;
  text-decoration: none;
  color: var(--primary-color);
  padding: 1rem;
  transition: 0.4s all ease;

  &:hover {
    background: var(--secondary-color);
  }
`;

export const ProductImage = styled.img`
  height: 400px;
  width: 500px;
  margin-top: 2.4rem;
  margin-right: 50px;

  @media screen and (max-width: 1030px) {
    height: 375px;
    width: 350px;
  }

  @media screen and (max-width: 800px) {
    height: 480px;
    width: 550px;
    padding-top: 2.4rem;
    margin: 0 auto;
  }

  @media screen and (max-width: 600px) {
    height: 400px;
    width: 450px;
  }

  @media screen and (max-width: 500px) {
    height: 330px;
    width: 350px;
  }

  @media screen and (max-width: 380px) {
    height: 280px;
    width: 300px;
  }

  @media screen and (max-width: 320px) {
    height: 240px;
    width: 250px;
  }

  @media screen and (min-height: 1366px) and (max-width: 1024px) {
    height: 550px;
    width: 780px;
  }
`;

export const ProductName = styled.h1`
  margin-top: 3rem;

  @media screen and (max-width: 1030px) {
    font-size: 1.3rem;
    margin-top: 3.3rem;
  }

  @media screen and (max-width: 800px) {
    font-size: 2rem;
    margin-top: 1.25rem;
    text-align: center;
  }
`;

export const ProductRating = styled.div`
  margin: 0.7rem 0;

  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: center;
  }
`;

export const ProductPrice = styled.div`
  @media screen and (max-width: 800px) {
    text-align: ${({ underline }) => !underline && "center"};
  }
`;

export const ProductDescription = styled.div`
  margin-top: 0.7rem;
  line-height: 1.5rem;

  @media screen and (max-width: 800px) {
    max-width: 400px;
    margin: 10px auto;
  }

  @media screen and (min-width: 500px) and (max-width: 800px) and (max-height: 800px) {
    text-align: justify;
  }

  @media screen and (max-width: 500px) {
    max-width: 300px;
  }

  @media screen and (max-width: 400px) {
    max-width: 250px;
  }
`;

export const ProductSummary = styled.div`
  align-self: flex-start;
  margin-top: 3.5rem;
  margin-left: 2rem;
  border: 1px solid var(--secondary-color);
  width: 200px;
  text-align: center;

  @media screen and (max-width: 1030px) {
    width: 160px;
  }

  @media screen and (max-width: 800px) {
    width: 400px;
    margin: 1.3rem auto;
  }

  @media screen and (max-width: 500px) {
    width: 350px;
  }

  @media screen and (max-width: 400px) {
    width: 250px;
  }

  @media screen and (min-height: 1366px) and (max-width: 1024px) {
    margin-left: auto;
    margin-right: auto;
    width: 400px;
  }
`;

export const ProductSummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid var(--secondary-color);
`;

export const ProductButton = styled(Button)`
  @media screen and (max-width: 800px) {
    margin: auto;
  }
`;

export const ProductQuantity = styled.select`
  width: 40px;
  outline: none;
  cursor: pointer;
  background: white;
  color: inherit;
  border: 1px solid grey;
  border-radius: 5px;
`;

export const ProductReviewContainer = styled.div`
  margin-top: 1.5rem;
  width: 80%;

  @media screen and (max-width: 400px) {
    width: initial;
  }
`;

export const ProductReviewHeading = styled.h1`
  margin-bottom: 1rem;
`;
