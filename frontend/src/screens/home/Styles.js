import styled from "styled-components";
import { FilterContainer, SearchInput } from "../../styles/Filters";

export const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 1100px;
  margin: 0 auto;

  @media screen and (max-width: 1150px) {
    max-width: 1050px;
  }

  @media screen and (max-width: 1100px) {
    max-width: 800px;
  }

  @media screen and (max-width: 900px) {
    max-width: 650px;
  }

  @media screen and (max-width: 740px) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }

  @media screen and (max-width: 559px) {
    max-width: 350px;
  }

  @media screen and (max-width: 380px) {
    max-width: 280px;
  }
`;

export const HomeFilterContainer = styled(FilterContainer)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const HomeSearchInput = styled(SearchInput)`
  padding: 8px;
  margin: 0;
  margin-bottom: 1.5rem;
  align-self: flex-start;

  @media screen and (max-width: 740px) {
    width: 400px;
  }

  @media screen and (max-width: 559px) {
    width: 340px;
    margin: auto;
    margin-bottom: 1.3rem;
  }

  @media screen and (max-width: 380px) {
    width: 280px;
  }

  @media screen and (max-width: 330px) {
    width: 250px;
  }
`;

export const SelectContainer = styled.div`
  margin-bottom: 0.5rem;
`;

export const SelectHeading = styled.h4`
  margin-bottom: 1rem;
`;

export const Price = styled.p`
  margin: 0.7rem 0;
`;

export const PriceRange = styled.input`
  cursor: pointer;
  outline: none;
`;

export const FiltersButton = styled.button`
  border: none;
  outline: none;
  background: hsl(0, 100%, 50%);
  color: white;
  padding: 0.4rem 0.7rem;
  margin: 2rem 0;
  align-self: flex-start;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease;
    background: hsl(0, 60%, 50%);
  }

  &:disabled {
    background: hsl(0, 40%, 50%);
    cursor: initial;
  }
`;

export const ProductContainer = styled.div`
  margin: 0 auto;
  max-width: 1000px;
  display: grid;
  column-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  @media screen and (max-width: 1100px) {
    max-width: 800px;
  }

  @media screen and (max-width: 900px) {
    max-width: 450px;
  }

  @media screen and (max-width: 559px) {
    max-width: 350px;
    margin: 0;
  }
`;

export const ProductWrapper = styled.div`
  width: 250px;
  border-radius: 5px;
  margin: 0 auto;

  @media screen and (max-width: 900px) {
    width: 340px;
  }

  @media screen and (max-width: 740px) {
    width: 400px;
  }

  @media screen and (max-width: 559px) {
    width: 350px;
  }

  @media screen and (max-width: 380px) {
    width: 260px;
  }
`;

export const ProductText = styled.p`
  text-align: center;
`;
