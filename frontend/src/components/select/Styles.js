import styled from "styled-components";

export const Select = styled.select`
  margin-bottom: 1.5rem;
  padding: 5px 1rem;
  width: ${({ loading }) => loading && "100px"};
  outline: none;
  cursor: pointer;
  appearance: none;
  border-radius: 15px;
  text-transform: capitalize;
  text-align: -webkit-center;
  text-overflow: ellipsis;
  /* for mobile devices */
  background: white;
  color: black;
  border: 1px solid grey;
`;
