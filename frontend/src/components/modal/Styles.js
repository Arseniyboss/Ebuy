import styled, { keyframes } from "styled-components";
import { FaTimes } from "react-icons/fa";

const modal = keyframes`
  0% {
    transform: scale(0);
  } 
  100% {
    transform: scale(1) rotate(360deg);
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: #fff;
  border-radius: 5px;
  width: 80vw;
  height: 150px;
  max-width: 350px;
  text-align: center;
  display: grid;
  align-content: center;
  position: relative;
  animation: ${modal} 0.5s linear;
`;

export const ModalHeading = styled.h2`
  margin-bottom: 0.4rem;
  color: red;

  @media screen and (max-width: 380px) {
    font-size: 1.3rem;
  }
`;

export const ModalText = styled.h3`
  color: green;

  @media screen and (max-width: 380px) {
    font-size: 1rem;
  }
`;

export const Cross = styled(FaTimes)`
  --align: 8px;
  position: absolute;
  top: var(--align);
  right: var(--align);
  font-size: 1.5rem;
  color: #bb2525;
  cursor: pointer;
`;
