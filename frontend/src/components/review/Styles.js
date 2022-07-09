import styled from "styled-components";

export const ProductReviewContainer = styled.div`
  border-bottom: ${({ underline }) => underline && "1px solid lightgrey"};
  padding-bottom: 1.4rem;
  margin: 1.4rem 0;
`;

export const ProductReviewComment = styled.p`
  margin-top: 1.4rem;
  max-width: 500px;
  word-wrap: break-word;

  @media screen and (max-width: 500px) {
    max-width: 300px;
  }

  @media screen and (max-width: 400px) {
    max-width: 250px;
  }
`;
