import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { Button } from "../../../GlobalStyle";

export const PlaceOrderHeader = styled.div`
  color: #808080;
  margin-left: 1.5rem;

  @media screen and (max-width: 600px) {
    text-align: center;
    margin-left: 0;
  }
`;

export const OrderId = styled.h1`
  word-wrap: break-word;
`;

export const PlaceOrderHeading = styled.h2`
  margin: 1rem 0;

  @media screen and (max-width: 1000px) {
    &:nth-child(1) {
      margin-top: 0;
    }
  }
`;

export const PlaceOrderItem = styled.p`
  margin: 1rem 0;
`;

export const CartLink = styled(Link)`
  color: black;
  text-decoration: none;
  margin-left: 1rem;

  &:hover {
    opacity: 0.5;
  }
`;

export const CartItemsContainer = styled.div`
  display: flex;
  justify-content: space-around;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    margin-top: 0;
  }
`;

export const CartItems = styled.div`
  width: 600px;

  @media screen and (max-width: 600px) {
    width: 60%;
  }
`;

export const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: ${({ underline }) =>
    underline && "1px solid var(--secondary-color)"};
  margin: 1.2rem 0;
  padding-bottom: 1.4rem;
  color: #808080;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    margin: 0;
  }
`;

export const ProductImage = styled.img`
  --size: 100px;
  height: var(--size);
  width: var(--size);
  border-radius: 5px;

  @media screen and (max-width: 600px) {
    --size: 300px;
    margin-bottom: 1.2rem;
  }

  @media screen and (max-width: 350px) {
    --size: 200px;
  }
`;

export const ProductName = styled(Link)`
  text-decoration: none;
  max-width: 150px;
  color: inherit;

  @media screen and (max-width: 600px) {
    max-width: initial;
    text-align: center;
  }
`;

export const CalculatedPrice = styled.div`
  width: 200px;

  @media screen and (max-width: 600px) {
    margin-top: 0.7rem;
    text-align: center;
  }
`;

export const ProductDetails = styled.div`
  display: flex;

  @media screen and (max-width: 600px) {
    align-items: center;
    margin: 0.7rem 0;
  }
`;

export const ProductPrice = styled.div`
  width: 50px;

  @media screen and (max-width: 600px) {
    max-width: initial;
  }
`;

export const ProductQuantity = styled.select`
  margin: 0 3rem;
  display: flex;
  align-self: flex-start;
  width: 40px;
  color: inherit;
  outline: none;
  cursor: pointer;

  @media screen and (max-width: 600px) {
    margin: 0 1.5rem;
  }
`;

export const Trashcan = styled(FaTrashAlt)`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const CartSubtotal = styled.div`
  border: 1px solid var(--secondary-color);
  width: 280px;
  color: #808080;
  align-self: flex-start;

  @media screen and (max-width: 1000px) {
    align-self: initial;
    width: 400px;
    margin-top: 1.5rem;
  }

  @media screen and (max-width: 600px) {
    width: 300px;
    margin-top: 0;
  }

  @media screen and (max-width: 350px) {
    width: 250px;
  }
`;

export const CartSubtotalItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--secondary-color);

  &:last-child {
    border-bottom: none;
  }
`;

export const CartSubtotalText = styled.p`
  margin-bottom: 0.4rem;
`;

export const CartSubtotalPrice = styled.div`
  letter-spacing: 2px;
`;

export const ClearButtonContainer = styled.div`
  display: flex;
  @media screen and (max-width: 1000px) {
    justify-content: center;
  }
`;

export const ClearButton = styled(Button)`
  background: #b24e92;
  color: white;
  width: initial;
  border-radius: 5px;
  margin-bottom: 1.2rem;

  &:hover {
    background: #884e92;
  }
`;

export const CardContainer = styled.div`
  padding: 12px 0;
  padding-left: 8px;
  border: none;
  background-color: #7795f8;
  border-radius: 4px;
  font-size: 1rem;
`;

export const FormButton = styled.button`
  width: 100%;
  padding: 9px;
  margin-top: 0.7rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: hsl(308, 82%, 80%);
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: hsl(308, 82%, 90%);
    cursor: initial;
  }

  &:hover:enabled {
    background-color: hsl(308, 82%, 75%);
  }
`;
