import styled, { keyframes } from "styled-components";

const loader = keyframes`
100% {
    transform: rotate(360deg);
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const LoaderContainer = styled.div`
  --size: 150px;
  height: var(--size);
  width: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 50%;
  animation: ${loader} 1s infinite linear;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export const RainbowLoader = styled(LoaderContainer)`
  background: conic-gradient(
    hsl(360, 100%, 50%),
    hsl(315, 100%, 50%),
    hsl(270, 100%, 50%),
    hsl(225, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(135, 100%, 50%),
    hsl(90, 100%, 50%),
    hsl(45, 100%, 50%),
    hsl(0, 100%, 50%)
  );
`;

export const StripeLoader = styled(LoaderContainer)`
  background: linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb);
`;

export const PrimaryLoader = styled(LoaderContainer)`
  background: linear-gradient(
    135deg,
    #feed07 0%,
    #fe6a50 5%,
    #ed00aa 15%,
    #2fe3fe 50%,
    #8900ff 100%
  );
`;

export const LoaderComponent = styled.div`
  --size: 130px;
  height: var(--size);
  width: var(--size);
  background: white;
  position: absolute;
  border-radius: 50%;
`;
