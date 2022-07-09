import { ErrorMessage, SuccessMessage, InfoMessage } from "./Styles";

const Message = ({ children, variant }) => {
  return (
    <>
      {variant === "info" && <InfoMessage>{children}</InfoMessage>}
      {variant === "success" && <SuccessMessage>{children}</SuccessMessage>}
      {variant === "error" && <ErrorMessage>{children}</ErrorMessage>}
    </>
  );
};

export default Message;
