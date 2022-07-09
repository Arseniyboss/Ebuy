import styled from "styled-components";

export const MessageContainer = styled.div`
  font-size: 1.2rem;
  padding: 1rem;
  margin-bottom: 1.2rem;
  border-radius: 0.25rem;

  @media screen and (max-width: 400px) {
    font-size: 1rem;
  }

  @media screen and (max-width: 350px) {
    font-size: 0.8rem;
  }
`;

export const InfoMessage = styled(MessageContainer)`
  background: #d2ebf5;
  color: #10516c;
`;

export const SuccessMessage = styled(MessageContainer)`
  background: #d4edda;
  color: #155724;
`;

export const ErrorMessage = styled(MessageContainer)`
  background: #f8d7da;
  color: #721c24;
`;
