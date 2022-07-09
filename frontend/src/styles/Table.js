import styled from "styled-components";
import { RiCloseLine, RiCheckLine } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Table = styled.table`
  display: block;
  border-collapse: collapse;
  width: fit-content;
  max-width: 90%;
  max-height: 475px;
  overflow: scroll;

  @media screen and (max-width: 1000px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const TableRow = styled.tr`
  &:nth-child(odd) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: lightgrey;
  }
`;

export const TableData = styled.td`
  text-align: left;
  padding: 0.7rem;
  border: 1px solid #ddd;
`;

export const TableHeading = styled(TableData)`
  text-transform: uppercase;
  font-weight: bold;
  white-space: nowrap;
`;

export const TableButton = styled.button`
  border: none;
  outline: none;
  background: white;
  color: black;
  padding: 0.4rem 0.8rem;
  cursor: pointer;

  &:nth-child(2) {
    background: #e36350;
  }

  &:disabled {
    opacity: 0.5;
    cursor: initial;
  }
`;

export const UserEmail = styled.a`
  text-decoration: none;
  color: inherit;
`;

export const Cross = styled(RiCloseLine)`
  color: red;
  font-size: 1.5rem;
`;

export const Check = styled(RiCheckLine)`
  color: limegreen;
  font-size: 1.5rem;
`;

export const Trashcan = styled(FaTrash)`
  color: white;
`;
