import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const PaginationButton = styled.button`
  outline: none;
  border: none;
  background: ${({ disabled }) => (disabled ? "#C0E5F8" : "#8CCAF8")};
  color: white;
  padding: 0.4rem;
  border-radius: 5px;
  display: flex;
  cursor: pointer;

  &:disabled {
    cursor: initial;
  }
`;

export const PaginationText = styled.p`
  margin: 0.2rem 0.5rem;
`;
