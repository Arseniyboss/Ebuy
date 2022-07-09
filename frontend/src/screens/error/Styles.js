import styled from "styled-components";

export const ErrorContainer = styled.section`
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const ErrorImage = styled.img`
  width: 500px;

  @media screen and (max-height: 410px) {
    width: 280px;
  }

  @media screen and (max-width: 550px), (max-height: 530px) {
    width: 400px;
  }

  @media screen and (max-width: 420px), (max-height: 460px) {
    width: 330px;
  }

  @media screen and (max-width: 340px), (max-height: 410px) {
    width: 250px;
  }

  @media screen and (max-height: 340px) {
    width: 190px;
  }
`;

export const ErrorText = styled.h1`
  text-transform: uppercase;
  font-weight: bold;
  margin: 1.5rem 0;

  @media screen and (max-width: 420px) {
    font-size: 1.2rem;
  }
`;

export const HomeButton = styled.button`
  border: none;
  border-radius: 5px;
  outline: none;
  color: white;
  background: #7a8bff;
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.2s background linear;

  &:hover {
    background: #7a6bff;
  }

  @media screen and (max-width: 420px) {
    font-size: 1rem;
  }
`;
