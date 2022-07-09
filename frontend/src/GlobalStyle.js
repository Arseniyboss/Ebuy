import styled, { createGlobalStyle } from "styled-components";
import { loading } from "./skeletons/animations/Loading";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :root {
    --primary-color: #444;
    --secondary-color: lightgrey;
    --loading-animation: ${loading} 1.5s linear infinite;
    --skeleton-background: darkgrey;
  }
`;

export const BaseSliderContainer = styled.section`
  width: 90vw;
  margin: 0 auto;
  margin-top: 4rem;
  margin-bottom: 1rem;
  max-width: 1100px;
`;

export const Container = styled.main`
  min-height: calc(100vh - 11.6rem);
`;

export const Heading = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  width: 100%;
  border: none;
  outline: none;
  background: #444;
  color: white;
  padding: 1.2rem;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease;
    background: black;
  }

  &:disabled {
    background: var(--secondary-color);
    cursor: initial;
  }
`;

export default GlobalStyle;
