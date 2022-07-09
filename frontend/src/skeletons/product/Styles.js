import styled from "styled-components";

export const SkeletonContainer = styled.div`
  background: var(--secondary-color);
  border-radius: 5px;
  margin-bottom: 20px;
  animation: var(--loading-animation);
`;

export const SkeletonCard = styled.div`
  width: 100%;
  height: 230px;
  background: var(--skeleton-background);
  border-radius: 5px 5px 0 0;

  @media screen and (max-width: 900px) {
    height: 265px;
  }

  @media screen and (max-width: 740px) {
    height: 315px;
  }

  @media screen and (max-width: 559px) {
    height: 285px;
  }

  @media screen and (max-width: 380px) {
    height: 265px;
  }
`;

export const SkeletonTextContainer = styled.div`
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 2.4rem;
`;

export const SkeletonText = styled.div`
  height: 30px;
  width: ${({ long }) => (long ? "80%" : "50%")};
  background: var(--skeleton-background);
  border-radius: 3px;
  margin: 0.4rem 0;
`;
