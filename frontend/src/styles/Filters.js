import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 559px) {
    flex-direction: column;
  }
`;

export const SearchInput = styled.input`
  outline: none;
  padding: 8px 1.2rem;
  padding-left: 12px;
  margin: 0 1.3rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 15px;
  font-size: 1rem;

  &:focus {
    border: 1px solid var(--primary-color);
  }

  @media screen and (max-width: 559px) {
    width: 360px;
    margin-bottom: 1.3rem;
  }

  @media screen and (max-width: 380px) {
    width: 280px;
  }

  @media screen and (max-width: 330px) {
    width: 250px;
  }
`;
